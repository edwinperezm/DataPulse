import express, { type Request, Response, NextFunction } from "express";
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

// Security middleware
app.use(helmet());
app.use(cors());

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

    const server = await registerRoutes(app);

    // Global error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      // Log the error
      console.error(`[ERROR] ${status}: ${message}`);
      if (err.stack) {
        console.error(err.stack);
      }

      // Don't expose stack traces in production
      const errorResponse = {
        message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
      };

      res.status(status).json(errorResponse);
    });

    // 404 handler for API routes
    app.use('/api/*', (req, res) => {
      res.status(404).json({ message: "API endpoint not found" });
    });

    // Setup Vite or serve static files
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

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
