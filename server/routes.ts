import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertClientSchema, 
  insertActivitySchema, 
  insertSurveySchema, 
  insertSurveyRecipientSchema, 
  insertAiSuggestionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // === Client Routes ===
  
  // Get all clients
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });
  
  // Get single client
  app.get("/api/clients/:id", async (req, res) => {
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
  app.post("/api/clients", async (req, res) => {
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
  app.patch("/api/clients/:id", async (req, res) => {
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
  
  // === Activity Routes ===
  
  // Get client activities
  app.get("/api/clients/:id/activities", async (req, res) => {
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
  app.post("/api/activities", async (req, res) => {
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
  
  // === Survey Routes ===
  
  // Get all surveys
  app.get("/api/surveys", async (req, res) => {
    try {
      const surveys = await storage.getSurveys();
      res.json(surveys);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch surveys" });
    }
  });
  
  // Get single survey
  app.get("/api/surveys/:id", async (req, res) => {
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
  app.post("/api/surveys", async (req, res) => {
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
  app.patch("/api/surveys/:id", async (req, res) => {
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
  
  // === Survey Recipients Routes ===
  
  // Get recipients by survey
  app.get("/api/surveys/:id/recipients", async (req, res) => {
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
  app.post("/api/survey-recipients", async (req, res) => {
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
  app.patch("/api/survey-recipients/:id", async (req, res) => {
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
  
  // === AI Suggestion Routes ===
  
  // Get suggestions for client
  app.get("/api/clients/:id/suggestions", async (req, res) => {
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
  app.post("/api/suggestions", async (req, res) => {
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
  app.patch("/api/suggestions/:id", async (req, res) => {
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

  // Create the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
