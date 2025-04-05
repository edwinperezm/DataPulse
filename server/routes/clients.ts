import { Router } from 'express';
import { storage } from '../services/storage';
import { insertClientSchema } from '@shared/schema';

const router = Router();

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await storage.getClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clients" });
  }
});

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    
    const client = await storage.getClient(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch client" });
  }
});

// Create client
router.post('/', async (req, res) => {
  try {
    const result = insertClientSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid client data", errors: result.error.format() });
    }
    
    const client = await storage.createClient(result.data);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: "Failed to create client" });
  }
});

// Update client
router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    
    const result = insertClientSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid client data", errors: result.error.format() });
    }
    
    const client = await storage.updateClient(id, result.data);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Failed to update client" });
  }
});

export default router; 