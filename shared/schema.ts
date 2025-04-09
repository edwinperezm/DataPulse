import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"),
  avatar: text("avatar"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
});

// Client schema
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  initials: text("initials").notNull(),
  status: text("status").notNull().default("healthy"), // "healthy", "needs-attention", "at-risk"
  lastActivityAt: timestamp("last_activity_at").notNull().defaultNow(),
  clientSince: timestamp("client_since").notNull().defaultNow(),
  healthScore: integer("health_score").notNull().default(100),
  trend: text("trend").notNull().default("stable"), // "improving", "stable", "declining"
  trendValue: integer("trend_value").notNull().default(0),
  usageStats: json("usage_stats").notNull().default({}),
});

export const insertClientSchema = createInsertSchema(clients).pick({
  name: true,
  initials: true,
  status: true,
  clientSince: true,
  healthScore: true,
  trend: true,
  trendValue: true,
  usageStats: true,
});

// Client activity schema
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  type: text("type").notNull(), // "login", "support", "survey", "meeting", etc.
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  icon: text("icon").notNull().default("user-circle"),
  iconBackground: text("icon_background").notNull().default("gray"),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  clientId: true,
  type: true,
  description: true,
  icon: true,
  iconBackground: true,
});

// Survey schema
export const surveys = pgTable("surveys", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "wtp", "csat", "nps", "custom"
  title: text("title").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  deadline: timestamp("deadline"),
  status: text("status").notNull().default("draft"), // "draft", "active", "completed"
  questions: json("questions").notNull().default([]),
  responseCount: integer("response_count").notNull().default(0),
  targetResponses: integer("target_responses").notNull().default(0),
  completionRate: integer("completion_rate").notNull().default(0),
});

export const insertSurveySchema = createInsertSchema(surveys).pick({
  type: true,
  title: true,
  deadline: true,
  status: true,
  questions: true,
});

// Survey recipients schema
export const surveyRecipients = pgTable("survey_recipients", {
  id: serial("id").primaryKey(),
  surveyId: integer("survey_id").notNull(),
  clientId: integer("client_id").notNull(),
  status: text("status").notNull().default("pending"), // "pending", "completed"
  completedAt: timestamp("completed_at"),
});

export const insertSurveyRecipientSchema = createInsertSchema(surveyRecipients).pick({
  surveyId: true,
  clientId: true,
  status: true,
});

// AI Suggestion schema
export const aiSuggestions = pgTable("ai_suggestions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  suggestion: text("suggestion").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("pending"), // "pending", "completed", "dismissed"
  completedAt: timestamp("completed_at"),
});

export const insertAiSuggestionSchema = createInsertSchema(aiSuggestions).pick({
  clientId: true,
  suggestion: true,
  status: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type Survey = typeof surveys.$inferSelect & {
  responseCount: number;
  targetResponses: number;
  completionRate: number;
};
export type InsertSurvey = z.infer<typeof insertSurveySchema>;

export type SurveyRecipient = typeof surveyRecipients.$inferSelect;
export type InsertSurveyRecipient = z.infer<typeof insertSurveyRecipientSchema>;

export type AiSuggestion = typeof aiSuggestions.$inferSelect;
export type InsertAiSuggestion = z.infer<typeof insertAiSuggestionSchema>;
