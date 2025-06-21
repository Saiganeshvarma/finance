import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'depositor' | 'borrower') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users data (fallback)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Depositor',
    email: 'john@example.com',
    role: 'depositor',
    balance: 50000,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Jane Borrower',
    email: 'jane@example.com',
    role: 'borrower',
    balance: 0,
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    balance: 0,
    createdAt: '2024-01-01',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('financeflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Try API login first
      const apiResponse = await authAPI.login({ email, password });
      if (apiResponse && apiResponse.success && apiResponse.user) {
        setUser(apiResponse.user);
        localStorage.setItem('financeflow_user', JSON.stringify(apiResponse.user));
        if (apiResponse.token) {
          localStorage.setItem('financeflow_token', apiResponse.token);
        }
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.log('API login failed, falling back to mock login');
      
      // Fallback to mock authentication
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        localStorage.setItem('financeflow_user', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string, role: 'depositor' | 'borrower'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Try API registration first
      const apiResponse = await authAPI.register({
        name,
        email,
        password,
        role,
      });
      
      if (apiResponse) {
        // Create user object from API response
        const newUser: User = {
          id: apiResponse._id || Date.now().toString(),
          name: apiResponse.name,
          email: apiResponse.email,
          role: apiResponse.role,
          balance: apiResponse.balance || (role === 'depositor' ? 10000 : 0),
          createdAt: apiResponse.createdAt || new Date().toISOString(),
        };
        
        setUser(newUser);
        localStorage.setItem('financeflow_user', JSON.stringify(newUser));
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.log('API registration failed, falling back to mock registration');
    }
    
    // Fallback to mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      balance: role === 'depositor' ? 10000 : 0, // Give depositors some initial balance
      createdAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('financeflow_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('financeflow_user');
    localStorage.removeItem('financeflow_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};