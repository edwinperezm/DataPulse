import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import * as dotenv from 'dotenv';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./config/vite";
import { isDatabaseAvailable } from "./config/database";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Security middleware with configuration to allow React to load properly
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "ws:", "wss:"]
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use("/api", apiLimiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Check database connection
    if (isDatabaseAvailable()) {
      log("Connected to database successfully");
    } else {
      log("WARNING: Database not available, using in-memory storage");
    }

    // Create HTTP server
    const server = createServer(app);

    // Setup Vite or serve static files first
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Then register API routes
    await registerRoutes(app);

    // 404 handler for API routes
    app.use('/api/*', (req, res) => {
      res.status(404).json({ message: "API endpoint not found" });
    });

    // Global error handling middleware
    app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      // Log the error with request details
      console.error(`[ERROR] ${status}: ${message}`);
      console.error(`[ERROR] Request: ${req.method} ${req.path}`);
      console.error(`[ERROR] Query: ${JSON.stringify(req.query)}`);
      console.error(`[ERROR] Body: ${JSON.stringify(req.body)}`);
      if (err.stack) {
        console.error(`[ERROR] Stack: ${err.stack}`);
      }

      // Don't expose stack traces in production
      const errorResponse = {
        status,
        message,
        path: req.path,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV !== 'production' && { 
          stack: err.stack,
          query: req.query,
          body: req.body
        }),
      };

      res.status(status).json(errorResponse);
    });

    // Use port from environment variable or fallback to 3000
    const port = process.env.PORT || 3000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`Server running in ${app.get("env")} mode on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
