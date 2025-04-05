import { Router } from 'express';
import { storage } from '../services/storage';
import { insertActivitySchema } from '@shared/schema';

const router = Router();

// Get client activities
router.get('/clients/:id', async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    
    const activities = await storage.getActivitiesByClientId(clientId);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activities" });
  }
});

// Create activity
router.post('/', async (req, res) => {
  try {
    const result = insertActivitySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid activity data", errors: result.error.format() });
    }
    
    // Check if client exists
    const client = await storage.getClient(result.data.clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    
    const activity = await storage.createActivity(result.data);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: "Failed to create activity" });
  }
});

export default router; 