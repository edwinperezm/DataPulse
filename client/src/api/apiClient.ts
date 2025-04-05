/**
 * API client with automatic token handling
 */

// Base API URL - defaults to relative path
const API_BASE_URL = '/api';

// Generic fetch function with authentication
export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Prepare headers with authentication if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  // Construct the full URL
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Make the request
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Handle non-2xx responses
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    } catch (e) {
      // If parsing fails, throw generic error
      throw new Error(`API error: ${response.status}`);
    }
  }
  
  // Return parsed JSON response
  return await response.json();
}

// API client with typed methods
export const apiClient = {
  // Auth endpoints
  auth: {
    login: (username: string, password: string) => 
      fetchWithAuth<{ user: any; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),
    
    register: (userData: any) => 
      fetchWithAuth<{ user: any; token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    me: () => 
      fetchWithAuth<any>('/auth/me'),
  },
  
  // Clients endpoints
  clients: {
    getAll: () => 
      fetchWithAuth<any[]>('/clients'),
    
    getById: (id: number) => 
      fetchWithAuth<any>(`/clients/${id}`),
    
    create: (data: any) => 
      fetchWithAuth<any>('/clients', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: number, data: any) => 
      fetchWithAuth<any>(`/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },
  
  // Other endpoints can be added here
};
