import { Client } from "@shared/schema";

// Define suggestion types
export type SuggestionType = 
  | 'check-in-call'
  | 'product-demo'
  | 'training-session'
  | 'feature-highlight'
  | 'feedback-request'
  | 'escalation'
  | 'upsell-opportunity';

// Structure for a suggestion template
export interface SuggestionTemplate {
  id: SuggestionType;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  forStatuses: Array<'healthy' | 'needs-attention' | 'at-risk'>;
}

// Suggestion templates
export const suggestionTemplates: SuggestionTemplate[] = [
  {
    id: 'check-in-call',
    title: 'Schedule a check-in call',
    description: 'Client activity has decreased. Schedule a personal check-in call to discuss their needs.',
    priority: 'medium',
    forStatuses: ['needs-attention', 'at-risk']
  },
  {
    id: 'product-demo',
    title: 'Offer a product demo',
    description: 'Client is not using key features. Schedule a product demo to showcase relevant functionality.',
    priority: 'medium',
    forStatuses: ['needs-attention', 'at-risk']
  },
  {
    id: 'training-session',
    title: 'Offer a training session',
    description: 'Client has new team members. Offer a training session to bring them up to speed.',
    priority: 'medium',
    forStatuses: ['healthy', 'needs-attention']
  },
  {
    id: 'feature-highlight',
    title: 'Send feature highlights',
    description: 'Client is not using recently released features. Send a personalized email highlighting new capabilities.',
    priority: 'low',
    forStatuses: ['healthy', 'needs-attention']
  },
  {
    id: 'feedback-request',
    title: 'Request detailed feedback',
    description: 'Client sentiment is dropping. Request specific feedback on pain points.',
    priority: 'high',
    forStatuses: ['needs-attention', 'at-risk']
  },
  {
    id: 'escalation',
    title: 'Escalate to management',
    description: 'Client risk level is high. Consider having a manager reach out directly.',
    priority: 'high',
    forStatuses: ['at-risk']
  },
  {
    id: 'upsell-opportunity',
    title: 'Explore upsell opportunity',
    description: 'Client is using all features frequently. Consider discussing premium plan options.',
    priority: 'low',
    forStatuses: ['healthy']
  }
];

// Generate AI suggestions based on client data
export function generateSuggestions(client: Client): SuggestionTemplate[] {
  const matchingSuggestions = suggestionTemplates.filter(suggestion => 
    suggestion.forStatuses.includes(client.status as any)
  );
  
  // Sort by priority
  const sortedSuggestions = [...matchingSuggestions].sort((a, b) => {
    const priorityValues = { high: 3, medium: 2, low: 1 };
    return priorityValues[b.priority] - priorityValues[a.priority];
  });
  
  // Return top 3 suggestions (or all if less than 3)
  return sortedSuggestions.slice(0, 3);
}
