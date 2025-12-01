import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@api/auth';

interface User {
  year: string;
  name: any;
  id: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
  member?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // For now, use mock user until backend profile endpoint is fully implemented
        const userData = JSON.parse(localStorage.getItem('userData') || 'null');
        if (userData) {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password);
    localStorage.setItem('token', response.token);
    localStorage.setItem('userData', JSON.stringify(response.user));
    setUser(response.user);
  };

  const register = async (userData: any) => {
    const response = await authAPI.register(userData);
    localStorage.setItem('token', response.token);
    localStorage.setItem('userData', JSON.stringify(response.user));
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};