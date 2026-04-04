import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { tokenStorage } from '../utils/tokenStorage';
import { getMe } from '../api/authApi';

interface AuthUser {
  userId: number;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = tokenStorage.getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    getMe()
      .then((me) => setUser(me))
      .catch(() => tokenStorage.removeToken())
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (token: string) => {
    tokenStorage.setToken(token);
    const me = await getMe();
    setUser(me);
  };

  const logout = () => {
    tokenStorage.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
