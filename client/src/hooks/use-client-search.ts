import { useSearch } from './use-search';
import { useClients } from './use-clients';
import type { Client } from "@shared/schema";

export function useClientSearch() {
  const { data: clients = [], isLoading } = useClients();
  
  const search = useSearch<Client>({
    items: clients,
    keys: [
      'name', 
      'initials',
      'status'
    ],
  });

  return {
    ...search,
    isLoading,
  };
}