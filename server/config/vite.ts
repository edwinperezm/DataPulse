import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  // Log that we're setting up Vite
  log("Setting up Vite development server");
  
  // Configure Vite server options
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
    proxy: {
      '/api/mock': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    },
  };

  // Create Vite server with custom configuration
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: viteLogger, // Use standard logger without custom error handler
    server: serverOptions,
    appType: "custom",
  });

  // Serve static files from client/public directory
  const publicDir = path.resolve(__dirname, "..", "..", "client", "public");
  app.use(express.static(publicDir));
  
  // Use Vite middleware for handling HMR and asset serving
  app.use(vite.middlewares);
  
  // Special route for test page
  app.get('/test.html', async (req, res) => {
    try {
      const staticHtmlPath = path.resolve(publicDir, "index.html");
      if (fs.existsSync(staticHtmlPath)) {
        const content = await fs.promises.readFile(staticHtmlPath, "utf-8");
        return res.status(200).set({ "Content-Type": "text/html" }).end(content);
      } else {
        return res.status(404).send('Test page not found');
      }
    } catch (error) {
      log(`Error serving test page: ${error}`);
      return res.status(500).send('Error serving test page');
    }
  });
  
  // For all non-API routes, use Vite to transform and serve the index.html
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    
    // Skip API routes
    if (url.startsWith('/api')) {
      return next();
    }

    log(`Serving React app for path: ${url}`);
    
    try {
      // Get the path to the client's index.html template
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "..",
        "client",
        "index.html"
      );

      // Read the template from disk and add cache-busting for the main entry point
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      
      // Add a timestamp to prevent caching issues
      const timestamp = Date.now();
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${timestamp}"`,
      );
      
      // Let Vite transform the HTML (resolving imports, applying HMR, etc.)
      const page = await vite.transformIndexHtml(url, template);
      
      // Send the transformed HTML to the client
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
      
      log(`Successfully served React app for ${url}`);
    } catch (e) {
      // Fix stack traces for better debugging
      vite.ssrFixStacktrace(e as Error);
      
      // Log the error
      log(`Error serving React app: ${e}`);
      
      // Pass the error to the next middleware
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "..", "dist");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
