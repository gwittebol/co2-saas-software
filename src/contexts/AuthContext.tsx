import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  subscription: 'basis' | 'standaard' | 'pro';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, company: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      name: 'Jan de Vries',
      email,
      company: 'De Groene Draai BV',
      subscription: 'standaard'
    });
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string, company: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      name,
      email,
      company,
      subscription: 'basis'
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}