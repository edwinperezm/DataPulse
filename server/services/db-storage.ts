import { eq } from 'drizzle-orm';
import { db, isDatabaseAvailable } from '../config/database';
import { storage as memStorage, IStorage } from './storage';
import {
  users, User, InsertUser,
  clients, Client, InsertClient,
  activities, Activity, InsertActivity,
  surveys, Survey, InsertSurvey,
  surveyRecipients, SurveyRecipient, InsertSurveyRecipient,
  aiSuggestions, AiSuggestion, InsertAiSuggestion
} from '@shared/schema';

/**
 * Database storage implementation using Drizzle ORM
 * Falls back to in-memory storage if database is not available
 */
export class DbStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    if (!isDatabaseAvailable()) return memStorage.getUser(id);
    
    const result = await db!.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!isDatabaseAvailable()) return memStorage.getUserByUsername(username);
    
    const result = await db!.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    if (!isDatabaseAvailable()) return memStorage.createUser(user);
    
    const result = await db!.insert(users).values(user).returning();
    return result[0];
  }

  // Client operations
  async getClients(): Promise<Client[]> {
    if (!isDatabaseAvailable()) return memStorage.getClients();
    
    return await db!.select().from(clients);
  }

  async getClient(id: number): Promise<Client | undefined> {
    if (!isDatabaseAvailable()) return memStorage.getClient(id);
    
    const result = await db!.select().from(clients).where(eq(clients.id, id)).limit(1);
    return result[0];
  }

  async createClient(client: InsertClient): Promise<Client> {
    if (!isDatabaseAvailable()) return memStorage.createClient(client);
    
    const result = await db!.insert(clients).values(client).returning();
    return result[0];
  }

  async updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined> {
    if (!isDatabaseAvailable()) return memStorage.updateClient(id, client);
    
    const result = await db!.update(clients)
      .set(client)
      .where(eq(clients.id, id))
      .returning();
    return result[0];
  }

  // Activity operations
  async getActivitiesByClientId(clientId: number): Promise<Activity[]> {
    if (!isDatabaseAvailable()) return memStorage.getActivitiesByClientId(clientId);
    
    return await db!.select()
      .from(activities)
      .where(eq(activities.clientId, clientId))
      .orderBy(activities.createdAt);
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    if (!isDatabaseAvailable()) return memStorage.createActivity(activity);
    
    const result = await db!.insert(activities).values(activity).returning();
    return result[0];
  }

  // Survey operations
  async getSurveys(): Promise<Survey[]> {
    if (!isDatabaseAvailable()) return memStorage.getSurveys();
    
    return await db!.select().from(surveys);
  }

  async getSurvey(id: number): Promise<Survey | undefined> {
    if (!isDatabaseAvailable()) return memStorage.getSurvey(id);
    
    const result = await db!.select().from(surveys).where(eq(surveys.id, id)).limit(1);
    return result[0];
  }

  async createSurvey(survey: InsertSurvey): Promise<Survey> {
    if (!isDatabaseAvailable()) return memStorage.createSurvey(survey);
    
    const result = await db!.insert(surveys).values(survey).returning();
    return result[0];
  }

  async updateSurvey(id: number, survey: Partial<InsertSurvey>): Promise<Survey | undefined> {
    if (!isDatabaseAvailable()) return memStorage.updateSurvey(id, survey);
    
    const result = await db!.update(surveys)
      .set(survey)
      .where(eq(surveys.id, id))
      .returning();
    return result[0];
  }

  // Survey recipient operations
  async getSurveyRecipientsByClientId(clientId: number): Promise<SurveyRecipient[]> {
    if (!isDatabaseAvailable()) return memStorage.getSurveyRecipientsByClientId(clientId);
    
    return await db!.select()
      .from(surveyRecipients)
      .where(eq(surveyRecipients.clientId, clientId));
  }

  async getSurveyRecipientsBySurveyId(surveyId: number): Promise<SurveyRecipient[]> {
    if (!isDatabaseAvailable()) return memStorage.getSurveyRecipientsBySurveyId(surveyId);
    
    return await db!.select()
      .from(surveyRecipients)
      .where(eq(surveyRecipients.surveyId, surveyId));
  }

  async createSurveyRecipient(recipient: InsertSurveyRecipient): Promise<SurveyRecipient> {
    if (!isDatabaseAvailable()) return memStorage.createSurveyRecipient(recipient);
    
    const result = await db!.insert(surveyRecipients).values(recipient).returning();
    return result[0];
  }

  async updateSurveyRecipient(id: number, recipient: Partial<InsertSurveyRecipient>): Promise<SurveyRecipient | undefined> {
    if (!isDatabaseAvailable()) return memStorage.updateSurveyRecipient(id, recipient);
    
    const result = await db!.update(surveyRecipients)
      .set(recipient)
      .where(eq(surveyRecipients.id, id))
      .returning();
    return result[0];
  }

  // AI suggestion operations
  async getAiSuggestionsByClientId(clientId: number): Promise<AiSuggestion[]> {
    if (!isDatabaseAvailable()) return memStorage.getAiSuggestionsByClientId(clientId);
    
    return await db!.select()
      .from(aiSuggestions)
      .where(eq(aiSuggestions.clientId, clientId));
  }

  async createAiSuggestion(suggestion: InsertAiSuggestion): Promise<AiSuggestion> {
    if (!isDatabaseAvailable()) return memStorage.createAiSuggestion(suggestion);
    
    const result = await db!.insert(aiSuggestions).values(suggestion).returning();
    return result[0];
  }

  async updateAiSuggestion(id: number, suggestion: Partial<InsertAiSuggestion>): Promise<AiSuggestion | undefined> {
    if (!isDatabaseAvailable()) return memStorage.updateAiSuggestion(id, suggestion);
    
    const result = await db!.update(aiSuggestions)
      .set(suggestion)
      .where(eq(aiSuggestions.id, id))
      .returning();
    return result[0];
  }
}
