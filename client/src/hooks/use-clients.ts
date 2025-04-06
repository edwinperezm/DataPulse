import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/utils/queryClient";
import { Client, InsertClient } from "@shared/schema";

// Mock client data for development
const mockClients: Client[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    initials: 'AC',
    status: 'healthy',
    lastActivityAt: new Date('2025-04-01'),
    clientSince: new Date('2023-05-15'),
    healthScore: 92,
    trend: 'improving',
    trendValue: 3,
    usageStats: { logins: 45, features: { dashboard: 38, reports: 22, surveys: 15 } }
  },
  {
    id: 2,
    name: 'Globex Industries',
    initials: 'GI',
    status: 'needs-attention',
    lastActivityAt: new Date('2025-03-28'),
    clientSince: new Date('2024-01-10'),
    healthScore: 72,
    trend: 'declining',
    trendValue: -5,
    usageStats: { logins: 28, features: { dashboard: 25, reports: 12, surveys: 5 } }
  },
  {
    id: 3,
    name: 'Initech LLC',
    initials: 'IL',
    status: 'healthy',
    lastActivityAt: new Date('2025-04-03'),
    clientSince: new Date('2022-11-22'),
    healthScore: 88,
    trend: 'stable',
    trendValue: 0,
    usageStats: { logins: 52, features: { dashboard: 48, reports: 35, surveys: 22 } }
  },
  {
    id: 4,
    name: 'Massive Dynamic',
    initials: 'MD',
    status: 'at-risk',
    lastActivityAt: new Date('2025-03-15'),
    clientSince: new Date('2023-08-05'),
    healthScore: 45,
    trend: 'declining',
    trendValue: -12,
    usageStats: { logins: 15, features: { dashboard: 12, reports: 5, surveys: 2 } }
  }
];

export function useClients() {
  return useQuery<Client[]>({
    queryKey: ['/api/clients'],
    queryFn: () => Promise.resolve(mockClients)
  });
}

export function useClient(id: number) {
  return useQuery<Client | undefined>({
    queryKey: ['/api/clients', id.toString()],
    enabled: !!id,
    queryFn: () => Promise.resolve(mockClients.find(c => c.id === id))
  });
}

// Mock client activities
const mockActivities = [
  { id: 1, clientId: 1, type: 'login', description: 'User login', createdAt: new Date('2025-04-01'), icon: 'log-in', iconBackground: 'blue' },
  { id: 2, clientId: 1, type: 'support', description: 'Support ticket created', createdAt: new Date('2025-03-28'), icon: 'help-circle', iconBackground: 'purple' },
  { id: 3, clientId: 2, type: 'meeting', description: 'Quarterly review meeting', createdAt: new Date('2025-03-25'), icon: 'users', iconBackground: 'green' },
  { id: 4, clientId: 3, type: 'survey', description: 'Completed NPS survey', createdAt: new Date('2025-04-02'), icon: 'clipboard', iconBackground: 'orange' },
  { id: 5, clientId: 4, type: 'support', description: 'Support ticket escalated', createdAt: new Date('2025-03-10'), icon: 'alert-triangle', iconBackground: 'red' }
];

export function useClientActivities(clientId: number) {
  return useQuery({
    queryKey: ['/api/clients', clientId.toString(), 'activities'],
    enabled: !!clientId,
    queryFn: () => Promise.resolve(mockActivities.filter(a => a.clientId === clientId))
  });
}

export function useClientSuggestions(clientId: number) {
  return useQuery({
    queryKey: ['/api/clients', clientId.toString(), 'suggestions'],
    enabled: !!clientId,
  });
}

export function useCreateClient() {
  return useMutation({
    mutationFn: async (client: InsertClient) => {
      const res = await apiRequest('POST', '/api/clients', client);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
    },
  });
}

export function useUpdateClient() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertClient> }) => {
      const res = await apiRequest('PATCH', `/api/clients/${id}`, data);
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
      queryClient.invalidateQueries({ queryKey: ['/api/clients', variables.id.toString()] });
    },
  });
}

export function useUpdateSuggestion() {
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest('PATCH', `/api/suggestions/${id}`, { status });
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
    },
  });
}
