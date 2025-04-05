import { Router } from 'express';
import { storage } from '../services/storage';
import { insertAiSuggestionSchema } from '@shared/schema';

const router = Router();

// Get suggestions for client
router.get('/clients/:id', async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    
    const suggestions = await storage.getAiSuggestionsByClientId(clientId);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch AI suggestions" });
  }
});

// Create AI suggestion
router.post('/', async (req, res) => {
  try {
    const result = insertAiSuggestionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid suggestion data", errors: result.error.format() });
    }
    
    // Check if client exists
    const client = await storage.getClient(result.data.clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    
    const suggestion = await storage.createAiSuggestion(result.data);
    res.status(201).json(suggestion);
  } catch (error) {
    res.status(500).json({ message: "Failed to create AI suggestion" });
  }
});

// Update AI suggestion
router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid suggestion ID" });
    }
    
    const result = insertAiSuggestionSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid suggestion data", errors: result.error.format() });
    }
    
    const suggestion = await storage.updateAiSuggestion(id, result.data);
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ message: "Failed to update AI suggestion" });
  }
});

export default router; 