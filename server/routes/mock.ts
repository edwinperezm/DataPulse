import express from 'express';
import { generateMockData } from '../mock-data';

const router = express.Router();
const mockData = generateMockData();

// Mock dashboard data
router.get('/dashboard', (req, res) => {
  try {
    console.log('[Mock API] GET /dashboard');
    const { revenue, userSessions } = mockData;
    res.json({ revenue, userSessions });
  } catch (error) {
    console.error('[Mock API] Error serving dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mock clients data
router.get('/clients', (req, res) => {
  try {
    console.log('[Mock API] GET /clients');
    res.json(mockData.clients);
  } catch (error) {
    console.error('[Mock API] Error serving clients data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mock surveys data
router.get('/surveys', (req, res) => {
  try {
    console.log('[Mock API] GET /surveys');
    if (!mockData.surveys) {
      console.error('[Mock API] Surveys data is undefined');
      res.status(500).json({ error: 'Survey data not available' });
      return;
    }
    res.json(mockData.surveys);
  } catch (error) {
    console.error('[Mock API] Error serving surveys data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mock survey by id
router.get('/surveys/:id', (req, res) => {
  try {
    const surveyId = parseInt(req.params.id);
    console.log(`[Mock API] GET /surveys/${surveyId}`);
    
    const survey = mockData.surveys.find(s => s.id === surveyId);
    if (!survey) {
      console.log(`[Mock API] Survey ${surveyId} not found`);
      res.status(404).json({ error: 'Survey not found' });
      return;
    }
    res.json(survey);
  } catch (error) {
    console.error('[Mock API] Error fetching survey:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
