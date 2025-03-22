import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Client, InsertClient } from "@shared/schema";

export function useClients() {
  return useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });
}

export function useClient(id: number) {
  return useQuery<Client>({
    queryKey: ['/api/clients', id.toString()],
    enabled: !!id,
  });
}

export function useClientActivities(clientId: number) {
  return useQuery({
    queryKey: ['/api/clients', clientId.toString(), 'activities'],
    enabled: !!clientId,
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
