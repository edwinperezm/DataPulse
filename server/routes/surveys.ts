import { Router } from 'express';
import { storage } from '../services/storage';
import { insertSurveySchema } from '@shared/schema';

const router = Router();

// Get all surveys
router.get('/', async (req, res) => {
  try {
    const surveys = await storage.getSurveys();
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch surveys" });
  }
});

// Get single survey
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid survey ID" });
    }
    
    const survey = await storage.getSurvey(id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch survey" });
  }
});

// Create survey
router.post('/', async (req, res) => {
  try {
    const result = insertSurveySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid survey data", errors: result.error.format() });
    }
    
    const survey = await storage.createSurvey(result.data);
    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({ message: "Failed to create survey" });
  }
});

// Update survey
router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid survey ID" });
    }
    
    const result = insertSurveySchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid survey data", errors: result.error.format() });
    }
    
    const survey = await storage.updateSurvey(id, result.data);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: "Failed to update survey" });
  }
});

export default router; 