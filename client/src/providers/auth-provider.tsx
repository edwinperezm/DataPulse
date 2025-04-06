import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Define user type
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

// Define registration data type
export interface RegisterData {
  username: string;
  password: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Auto-authenticate with mock user for development
  useEffect(() => {
    // Create a mock user for automatic authentication
    const mockUser: User = {
      id: 1,
      username: 'demo_user',
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'admin'
    };
    
    // Set mock token
    const mockToken = 'mock-jwt-token-for-development';
    
    // Set user and token
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('token', mockToken);
    
    // Finish loading
    setIsLoading(false);
  }, []);

  // Mock fetch user data function (not used in bypass mode)
  const fetchUserData = async (authToken: string) => {
    // This function is not used in bypass mode but kept for reference
    console.log('fetchUserData called with token:', authToken);
    // In bypass mode, we're using the mock user set in the useEffect
  };

  // Login function
  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        toast({
          title: "Login successful",
          description: `Welcome back, ${data.user.name}!`,
        });
      } else {
        const error = await response.json();
        toast({
          title: "Login failed",
          description: error.message || "Invalid username or password",
          variant: "destructive",
        });
        throw new Error(error.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        toast({
          title: "Registration successful",
          description: `Welcome, ${data.user.name}!`,
        });
      } else {
        const error = await response.json();
        toast({
          title: "Registration failed",
          description: error.message || "Could not create account",
          variant: "destructive",
        });
        throw new Error(error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
