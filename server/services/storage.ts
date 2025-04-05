import {
  users, User, InsertUser,
  clients, Client, InsertClient,
  activities, Activity, InsertActivity,
  surveys, Survey, InsertSurvey,
  surveyRecipients, SurveyRecipient, InsertSurveyRecipient,
  aiSuggestions, AiSuggestion, InsertAiSuggestion
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Client operations
  getClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  
  // Activity operations
  getActivitiesByClientId(clientId: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Survey operations
  getSurveys(): Promise<Survey[]>;
  getSurvey(id: number): Promise<Survey | undefined>;
  createSurvey(survey: InsertSurvey): Promise<Survey>;
  updateSurvey(id: number, survey: Partial<InsertSurvey>): Promise<Survey | undefined>;
  
  // Survey recipient operations
  getSurveyRecipientsByClientId(clientId: number): Promise<SurveyRecipient[]>;
  getSurveyRecipientsBySurveyId(surveyId: number): Promise<SurveyRecipient[]>;
  createSurveyRecipient(recipient: InsertSurveyRecipient): Promise<SurveyRecipient>;
  updateSurveyRecipient(id: number, recipient: Partial<InsertSurveyRecipient>): Promise<SurveyRecipient | undefined>;
  
  // AI suggestion operations
  getAiSuggestionsByClientId(clientId: number): Promise<AiSuggestion[]>;
  createAiSuggestion(suggestion: InsertAiSuggestion): Promise<AiSuggestion>;
  updateAiSuggestion(id: number, suggestion: Partial<InsertAiSuggestion>): Promise<AiSuggestion | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clients: Map<number, Client>;
  private activities: Map<number, Activity>;
  private surveys: Map<number, Survey>;
  private surveyRecipients: Map<number, SurveyRecipient>;
  private aiSuggestions: Map<number, AiSuggestion>;
  
  private userId: number;
  private clientId: number;
  private activityId: number;
  private surveyId: number;
  private surveyRecipientId: number;
  private aiSuggestionId: number;
  
  constructor() {
    this.users = new Map();
    this.clients = new Map();
    this.activities = new Map();
    this.surveys = new Map();
    this.surveyRecipients = new Map();
    this.aiSuggestions = new Map();
    
    this.userId = 1;
    this.clientId = 1;
    this.activityId = 1;
    this.surveyId = 1;
    this.surveyRecipientId = 1;
    this.aiSuggestionId = 1;
    
    // Initialize with demo data
    this.initializeData();
  }
  
  private initializeData() {
    // Create default user
    this.createUser({
      username: "admin",
      password: "password",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "admin",
      avatar: ""
    });
    
    // Create some clients
    const acme = this.createClient({
      name: "Acme Corporation",
      initials: "AC",
      status: "healthy",
      clientSince: new Date("2022-01-10"),
      healthScore: 85,
      trend: "stable",
      trendValue: 0,
      usageStats: {
        loginFrequency: "daily",
        usageTime: "120 min",
        featureUsage: "10/12"
      }
    });
    
    const stellar = this.createClient({
      name: "Stellar Brands",
      initials: "SB",
      status: "needs-attention",
      clientSince: new Date("2022-03-15"),
      healthScore: 65,
      trend: "declining",
      trendValue: -15,
      usageStats: {
        loginFrequency: "weekly",
        usageTime: "45 min",
        featureUsage: "7/12"
      }
    });
    
    const tech = this.createClient({
      name: "Tech Innovations",
      initials: "TI",
      status: "at-risk",
      clientSince: new Date("2022-01-20"),
      healthScore: 42,
      trend: "declining",
      trendValue: -28,
      usageStats: {
        loginFrequency: "2x/month",
        usageTime: "32 min",
        featureUsage: "4/12"
      }
    });
    
    const global = this.createClient({
      name: "Global Dynamics",
      initials: "GD",
      status: "healthy",
      clientSince: new Date("2021-10-05"),
      healthScore: 92,
      trend: "improving",
      trendValue: 8,
      usageStats: {
        loginFrequency: "daily",
        usageTime: "150 min",
        featureUsage: "12/12"
      }
    });
    
    // Create activities for Tech Innovations
    this.createActivity({
      clientId: tech.id,
      type: "support",
      description: "Support ticket opened: \"Can't access reporting dashboard\"",
      icon: "exclamation-triangle",
      iconBackground: "danger"
    });
    
    this.createActivity({
      clientId: tech.id,
      type: "survey",
      description: "NPS Survey: Rated 6/10",
      icon: "poll",
      iconBackground: "warning"
    });
    
    this.createActivity({
      clientId: tech.id,
      type: "login",
      description: "Last login by admin user: John Smith",
      icon: "user-circle",
      iconBackground: "gray"
    });
    
    this.createActivity({
      clientId: tech.id,
      type: "meeting",
      description: "Quarterly business review meeting completed",
      icon: "check",
      iconBackground: "success"
    });
    
    // Create AI suggestions for Tech Innovations
    this.createAiSuggestion({
      clientId: tech.id,
      suggestion: "Schedule a check-in call to discuss recent platform changes",
      status: "pending"
    });
    
    this.createAiSuggestion({
      clientId: tech.id,
      suggestion: "Send a personalized email highlighting unused features that match their goals",
      status: "pending"
    });
    
    this.createAiSuggestion({
      clientId: tech.id,
      suggestion: "Offer a training session for new team members",
      status: "pending"
    });
    
    // Create a survey
    this.createSurvey({
      type: "wtp",
      title: "Willingness To Pay Survey",
      deadline: new Date("2023-06-01"),
      status: "active",
      questions: [
        {
          id: 1,
          text: "How likely are you to recommend our service to a colleague?",
          type: "rating",
          options: { min: 1, max: 10 }
        },
        {
          id: 2,
          text: "What would you pay for this service annually?",
          type: "text"
        },
        {
          id: 3,
          text: "Which feature provides the most value to your business?",
          type: "select",
          options: {
            choices: ["Reporting", "Integration", "Automation", "Customer Support"]
          }
        }
      ]
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Client operations
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }
  
  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }
  
  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.clientId++;
    const client: Client = { 
      ...insertClient, 
      id, 
      lastActivityAt: new Date() 
    };
    this.clients.set(id, client);
    return client;
  }
  
  async updateClient(id: number, clientUpdate: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updatedClient = { ...client, ...clientUpdate };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }
  
  // Activity operations
  async getActivitiesByClientId(clientId: number): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(activity => activity.clientId === clientId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.activityId++;
    const activity: Activity = { 
      ...insertActivity, 
      id, 
      createdAt: new Date() 
    };
    this.activities.set(id, activity);
    
    // Update client's last activity time
    const client = this.clients.get(insertActivity.clientId);
    if (client) {
      client.lastActivityAt = new Date();
      this.clients.set(client.id, client);
    }
    
    return activity;
  }
  
  // Survey operations
  async getSurveys(): Promise<Survey[]> {
    return Array.from(this.surveys.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getSurvey(id: number): Promise<Survey | undefined> {
    return this.surveys.get(id);
  }
  
  async createSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const id = this.surveyId++;
    const survey: Survey = { 
      ...insertSurvey, 
      id, 
      createdAt: new Date() 
    };
    this.surveys.set(id, survey);
    return survey;
  }
  
  async updateSurvey(id: number, surveyUpdate: Partial<InsertSurvey>): Promise<Survey | undefined> {
    const survey = this.surveys.get(id);
    if (!survey) return undefined;
    
    const updatedSurvey = { ...survey, ...surveyUpdate };
    this.surveys.set(id, updatedSurvey);
    return updatedSurvey;
  }
  
  // Survey recipient operations
  async getSurveyRecipientsByClientId(clientId: number): Promise<SurveyRecipient[]> {
    return Array.from(this.surveyRecipients.values())
      .filter(recipient => recipient.clientId === clientId);
  }
  
  async getSurveyRecipientsBySurveyId(surveyId: number): Promise<SurveyRecipient[]> {
    return Array.from(this.surveyRecipients.values())
      .filter(recipient => recipient.surveyId === surveyId);
  }
  
  async createSurveyRecipient(insertRecipient: InsertSurveyRecipient): Promise<SurveyRecipient> {
    const id = this.surveyRecipientId++;
    const recipient: SurveyRecipient = { 
      ...insertRecipient, 
      id, 
      completedAt: null
    };
    this.surveyRecipients.set(id, recipient);
    return recipient;
  }
  
  async updateSurveyRecipient(id: number, recipientUpdate: Partial<InsertSurveyRecipient>): Promise<SurveyRecipient | undefined> {
    const recipient = this.surveyRecipients.get(id);
    if (!recipient) return undefined;
    
    const updatedRecipient = { ...recipient, ...recipientUpdate };
    this.surveyRecipients.set(id, updatedRecipient);
    return updatedRecipient;
  }
  
  // AI suggestion operations
  async getAiSuggestionsByClientId(clientId: number): Promise<AiSuggestion[]> {
    return Array.from(this.aiSuggestions.values())
      .filter(suggestion => suggestion.clientId === clientId);
  }
  
  async createAiSuggestion(insertSuggestion: InsertAiSuggestion): Promise<AiSuggestion> {
    const id = this.aiSuggestionId++;
    const suggestion: AiSuggestion = { 
      ...insertSuggestion, 
      id, 
      createdAt: new Date(), 
      completedAt: null 
    };
    this.aiSuggestions.set(id, suggestion);
    return suggestion;
  }
  
  async updateAiSuggestion(id: number, suggestionUpdate: Partial<InsertAiSuggestion>): Promise<AiSuggestion | undefined> {
    const suggestion = this.aiSuggestions.get(id);
    if (!suggestion) return undefined;
    
    const updatedSuggestion: AiSuggestion = { 
      ...suggestion, 
      ...suggestionUpdate,
      completedAt: suggestionUpdate.status === 'completed' ? new Date() : suggestion.completedAt
    };
    
    this.aiSuggestions.set(id, updatedSuggestion);
    return updatedSuggestion;
  }
}

export const storage = new MemStorage();
