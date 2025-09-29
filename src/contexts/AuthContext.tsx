import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const getPreferredStorage = () => {
    try {
      const preference = localStorage.getItem('auth_storage'); // 'local' | 'session'
      return preference === 'local' ? localStorage : sessionStorage;
    } catch {
      return sessionStorage;
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
      const mockToken = 'mock-token-123';
      setUser(mockUser);
      setToken(mockToken);
      const storage = getPreferredStorage();
      storage.setItem('user', JSON.stringify(mockUser));
      storage.setItem('token', mockToken);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock signup - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
      const mockToken = 'mock-token-123';
      setUser(mockUser);
      setToken(mockToken);
      // For signup, default to local persistence
      try { localStorage.setItem('auth_storage', 'local'); } catch {}
      const storage = getPreferredStorage();
      storage.setItem('user', JSON.stringify(mockUser));
      storage.setItem('token', mockToken);
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    return signup(name, email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    } catch {}
  };

  React.useEffect(() => {
    try {
      const savedUserLocal = localStorage.getItem('user');
      const savedTokenLocal = localStorage.getItem('token');
      const savedUserSession = sessionStorage.getItem('user');
      const savedTokenSession = sessionStorage.getItem('token');

      if (savedUserLocal && savedTokenLocal) {
        setUser(JSON.parse(savedUserLocal));
        setToken(savedTokenLocal);
      } else if (savedUserSession && savedTokenSession) {
        setUser(JSON.parse(savedUserSession));
        setToken(savedTokenSession);
      }
    } catch {}
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, signup, register, logout, isLoading }}>
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