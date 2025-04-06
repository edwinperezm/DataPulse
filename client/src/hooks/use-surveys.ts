import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/utils/queryClient";
import { Survey, InsertSurvey, SurveyRecipient, InsertSurveyRecipient } from "@shared/schema";

// Mock survey data for development
const mockSurveys: Survey[] = [
  {
    id: 1,
    type: 'nps',
    title: 'Q1 Customer Satisfaction',
    createdAt: new Date('2025-01-15'),
    deadline: new Date('2025-04-15'),
    status: 'active',
    questions: [
      { id: 1, text: 'How likely are you to recommend our product?', type: 'scale' },
      { id: 2, text: 'What could we improve?', type: 'text' }
    ]
  },
  {
    id: 2,
    type: 'csat',
    title: 'Product Feedback Survey',
    createdAt: new Date('2025-02-10'),
    deadline: new Date('2025-05-10'),
    status: 'draft',
    questions: [
      { id: 1, text: 'How satisfied are you with our product?', type: 'scale' },
      { id: 2, text: 'Which features do you use most?', type: 'multiselect' }
    ]
  },
  {
    id: 3,
    type: 'wtp',
    title: 'Pricing Survey',
    createdAt: new Date('2025-03-05'),
    deadline: new Date('2025-04-05'),
    status: 'completed',
    questions: [
      { id: 1, text: 'How much would you pay for this product?', type: 'number' },
      { id: 2, text: 'What features would justify a higher price?', type: 'text' }
    ]
  }
];

export function useSurveys() {
  return useQuery<Survey[]>({
    queryKey: ['/api/surveys'],
    queryFn: () => Promise.resolve(mockSurveys)
  });
}

export function useSurvey(id: number) {
  return useQuery<Survey | undefined>({
    queryKey: ['/api/surveys', id.toString()],
    enabled: !!id,
    queryFn: () => Promise.resolve(mockSurveys.find(s => s.id === id))
  });
}

// Mock survey recipients
const mockRecipients: SurveyRecipient[] = [
  { id: 1, surveyId: 1, clientId: 1, status: 'pending', completedAt: null },
  { id: 2, surveyId: 1, clientId: 2, status: 'completed', completedAt: new Date('2025-03-20') },
  { id: 3, surveyId: 2, clientId: 1, status: 'pending', completedAt: null },
  { id: 4, surveyId: 3, clientId: 3, status: 'completed', completedAt: new Date('2025-04-01') }
];

export function useSurveyRecipients(surveyId: number) {
  return useQuery<SurveyRecipient[]>({
    queryKey: ['/api/surveys', surveyId.toString(), 'recipients'],
    enabled: !!surveyId,
    queryFn: () => Promise.resolve(mockRecipients.filter(r => r.surveyId === surveyId))
  });
}

export function useCreateSurvey() {
  return useMutation({
    mutationFn: async (survey: InsertSurvey) => {
      const res = await apiRequest('POST', '/api/surveys', survey);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/surveys'] });
    },
  });
}

export function useUpdateSurvey() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertSurvey> }) => {
      const res = await apiRequest('PATCH', `/api/surveys/${id}`, data);
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/surveys'] });
      queryClient.invalidateQueries({ queryKey: ['/api/surveys', variables.id.toString()] });
    },
  });
}

export function useAddSurveyRecipient() {
  return useMutation({
    mutationFn: async (recipient: InsertSurveyRecipient) => {
      const res = await apiRequest('POST', '/api/survey-recipients', recipient);
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/surveys', variables.surveyId.toString(), 'recipients'] });
    },
  });
}

export function usePendingSurveysCount() {
  return useQuery<number>({
    queryKey: ['/api/surveys/pending/count'],
  });
}

export function useSurveysByClient(clientId: number) {
  return useQuery<Survey[]>({
    queryKey: ['/api/surveys/client', clientId],
    enabled: !!clientId,
  });
}

// Survey templates
export const surveyTemplates = {
  wtp: {
    type: 'wtp',
    title: 'Willingness To Pay Survey',
    questions: [
      {
        id: 1,
        text: 'How likely are you to recommend our service to a colleague?',
        type: 'rating',
        options: { min: 1, max: 10 }
      },
      {
        id: 2,
        text: 'What would you pay for this service annually?',
        type: 'text'
      },
      {
        id: 3,
        text: 'Which feature provides the most value to your business?',
        type: 'select',
        options: {
          choices: ['Reporting', 'Integration', 'Automation', 'Customer Support']
        }
      }
    ]
  },
  csat: {
    type: 'csat',
    title: 'Customer Satisfaction Survey',
    questions: [
      {
        id: 1,
        text: 'How satisfied are you with our product?',
        type: 'rating',
        options: { min: 1, max: 5 }
      },
      {
        id: 2,
        text: 'What do you like most about our product?',
        type: 'text'
      },
      {
        id: 3,
        text: 'What could we improve?',
        type: 'text'
      }
    ]
  },
  nps: {
    type: 'nps',
    title: 'Net Promoter Score Survey',
    questions: [
      {
        id: 1,
        text: 'How likely are you to recommend our company to a friend or colleague?',
        type: 'rating',
        options: { min: 0, max: 10 }
      },
      {
        id: 2,
        text: 'What is the primary reason for your score?',
        type: 'text'
      }
    ]
  }
};
