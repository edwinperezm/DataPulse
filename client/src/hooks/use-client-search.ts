import { useSearch } from './use-search';
import { useClients } from './use-clients';
import { Client } from '../../shared/schema';

export function useClientSearch() {
  const { data: clients = [], isLoading } = useClients();
  
  const search = useSearch<Client>({
    items: clients,
    keys: [
      'name', 
      'industry', 
      'contactName', 
      'contactEmail',
      'description'
    ],
  });

  return {
    ...search,
    isLoading,
  };
}