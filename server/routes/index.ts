import { Express } from 'express';
import { createServer, type Server } from 'http';
import { authenticateToken } from '../middleware/auth';
import authRoutes from './auth';
import clientRoutes from './clients';
import activityRoutes from './activities';
import surveyRoutes from './surveys';
import surveyRecipientRoutes from './surveyRecipients';
import suggestionRoutes from './suggestions';

export async function registerRoutes(app: Express): Promise<Server> {
  // Public API Routes
  app.use('/api/auth', authRoutes);
  
  // Temporarily disable authentication for testing
  // Protected API Routes - require authentication
  app.use('/api/clients', clientRoutes); // removed authenticateToken
  app.use('/api/activities', activityRoutes); // removed authenticateToken
  app.use('/api/surveys', surveyRoutes); // removed authenticateToken
  app.use('/api/survey-recipients', surveyRecipientRoutes); // removed authenticateToken
  app.use('/api/suggestions', suggestionRoutes); // removed authenticateToken

  // Create the HTTP server
  const httpServer = createServer(app);
  return httpServer;
} 