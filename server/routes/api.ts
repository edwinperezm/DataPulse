import express from 'express';
import { generateMockData } from '../mock-data';

const router = express.Router();
let mockData = generateMockData();

// Regenerate mock data every hour to simulate changes
setInterval(() => {
  mockData = generateMockData();
}, 1000 * 60 * 60);

// Dashboard data endpoint
router.get('/dashboard', (req, res) => {
  const { revenue, userSessions } = mockData;
  res.json({ revenue, userSessions });
});

// Clients endpoint
router.get('/clients', (req, res) => {
  res.json(mockData.clients);
});

// Surveys endpoint
router.get('/surveys', (req, res) => {
  res.json(mockData.surveys);
});

// Individual survey endpoint
router.get('/surveys/:id', (req, res) => {
  const survey = mockData.surveys.find(s => s.id === req.params.id);
  if (!survey) {
    res.status(404).json({ error: 'Survey not found' });
    return;
  }
  res.json(survey);
});

export default router;
