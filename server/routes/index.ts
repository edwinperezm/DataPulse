import { Express } from 'express';
import { createServer, type Server } from 'http';
import { authenticateToken } from '../middleware/auth';
import authRoutes from './auth';
import clientRoutes from './clients';
import activityRoutes from './activities';
import surveyRoutes from './surveys';
import surveyRecipientRoutes from './surveyRecipients';
import suggestionRoutes from './suggestions';

export async function registerRoutes(app: Express): Promise<void> {
  // In development, use mock routes without authentication
  if (process.env.NODE_ENV === 'development') {
    const { default: mockRoutes } = await import('./mock');
    app.use('/api/mock', mockRoutes);
  } else {
    // Public API Routes
    app.use('/api/auth', authRoutes);
    
    // Protected API Routes - require authentication
    app.use('/api/clients', authenticateToken, clientRoutes);
    app.use('/api/activities', authenticateToken, activityRoutes);
    app.use('/api/surveys', authenticateToken, surveyRoutes);
    app.use('/api/survey-recipients', authenticateToken, surveyRecipientRoutes);
    app.use('/api/suggestions', authenticateToken, suggestionRoutes);
  }
} 