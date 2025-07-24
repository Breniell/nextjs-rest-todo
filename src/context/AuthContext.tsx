'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('todos_user');
    if (stored) setUser(stored);
  }, []);

  const login = (username: string) => {
    localStorage.setItem('todos_user', username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('todos_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
