import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'ADMIN' | 'USER';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>; // alias
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---- admin config from env ----
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((s: string) => s.trim().toLowerCase())
  .filter(Boolean);

const ADMIN_DOMAIN = (import.meta.env.VITE_ADMIN_DOMAIN || '').toLowerCase();

function deriveRole(email: string): 'ADMIN' | 'USER' {
  const e = (email || '').toLowerCase();
  if (ADMIN_EMAILS.includes(e)) return 'ADMIN';
  if (ADMIN_DOMAIN && e.endsWith(ADMIN_DOMAIN)) return 'ADMIN';
  return 'USER';
}

// remember-me storage
function getPreferredStorage(): Storage {
  try {
    const pref = localStorage.getItem('auth_storage'); // 'local' | 'session'
    return pref === 'local' ? localStorage : sessionStorage;
  } catch {
    return sessionStorage;
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // restore from either session or local
  useEffect(() => {
    try {
      const rawL = localStorage.getItem('user');
      const tokL = localStorage.getItem('token');
      const rawS = sessionStorage.getItem('user');
      const tokS = sessionStorage.getItem('token');
      let u: User | null = null;
      let t: string | null = null;
      if (rawL && tokL) { u = JSON.parse(rawL); t = tokL; }
      else if (rawS && tokS) { u = JSON.parse(rawS); t = tokS; }
      if (u && u.email) u.role = deriveRole(u.email);
      setUser(u ?? null);
      setToken(t ?? null);
    } catch {}
  }, []);

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      // TODO: replace mock with real API
      await new Promise(r => setTimeout(r, 600));
      const next: User = {
        id: 'u_' + Date.now(),
        name: email.split('@')[0],
        email,
        avatar: 'https://i.pravatar.cc/100?u=' + encodeURIComponent(email),
        role: deriveRole(email),
      };
      const tok = 'mock-token-123';
      setUser(next);
      setToken(tok);
      const store = getPreferredStorage();
      store.setItem('user', JSON.stringify(next));
      store.setItem('token', tok);
    } finally {
      setIsLoading(false);
    }
  }

  async function signup(name: string, email: string, password: string) {
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const next: User = {
        id: 'u_' + Date.now(),
        name: name || (email.split('@')[0]),
        email,
        avatar: 'https://i.pravatar.cc/100?u=' + encodeURIComponent(email),
        role: deriveRole(email),
      };
      const tok = 'mock-token-123';
      try { localStorage.setItem('auth_storage', 'local'); } catch {}
      const store = getPreferredStorage();
      store.setItem('user', JSON.stringify(next));
      store.setItem('token', tok);
      setUser(next);
      setToken(tok);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    return signup(name, email, password);
  }

  function logout() {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    } catch {}
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, signup, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const useIsAdmin = () => {
  const { user } = useAuth();
  return user?.role === 'ADMIN';
};
