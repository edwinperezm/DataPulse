import { Router } from 'express';
import { storage } from '../services/storage';
import { insertSurveyRecipientSchema } from '@shared/schema';

const router = Router();

// Get recipients by survey
router.get('/surveys/:id', async (req, res) => {
  try {
    const surveyId = parseInt(req.params.id);
    if (isNaN(surveyId)) {
      return res.status(400).json({ message: "Invalid survey ID" });
    }
    
    const recipients = await storage.getSurveyRecipientsBySurveyId(surveyId);
    res.json(recipients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch survey recipients" });
  }
});

// Create survey recipient
router.post('/', async (req, res) => {
  try {
    const result = insertSurveyRecipientSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid recipient data", errors: result.error.format() });
    }
    
    // Check if survey and client exist
    const survey = await storage.getSurvey(result.data.surveyId);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    
    const client = await storage.getClient(result.data.clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    
    const recipient = await storage.createSurveyRecipient(result.data);
    res.status(201).json(recipient);
  } catch (error) {
    res.status(500).json({ message: "Failed to create survey recipient" });
  }
});

// Update survey recipient
router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid recipient ID" });
    }
    
    const result = insertSurveyRecipientSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid recipient data", errors: result.error.format() });
    }
    
    const recipient = await storage.updateSurveyRecipient(id, result.data);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    
    res.json(recipient);
  } catch (error) {
    res.status(500).json({ message: "Failed to update survey recipient" });
  }
});

export default router; 