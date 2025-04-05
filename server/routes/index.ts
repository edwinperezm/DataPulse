import { Express } from 'express';
import { createServer, type Server } from 'http';
import clientRoutes from './clients';
import activityRoutes from './activities';
import surveyRoutes from './surveys';
import surveyRecipientRoutes from './surveyRecipients';
import suggestionRoutes from './suggestions';

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.use('/api/clients', clientRoutes);
  app.use('/api/activities', activityRoutes);
  app.use('/api/surveys', surveyRoutes);
  app.use('/api/survey-recipients', surveyRecipientRoutes);
  app.use('/api/suggestions', suggestionRoutes);

  // Create the HTTP server
  const httpServer = createServer(app);
  return httpServer;
} 