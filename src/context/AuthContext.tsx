import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  upiId: string | null;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  upiId: string | null;
  setUpiId: (upiId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [upiId, setUpiId] = useState<string | null>(() => {
    return user?.upiId || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (upiId && user) {
      setUser({ ...user, upiId });
    }
  }, [upiId]);

  return (
    <AuthContext.Provider value={{ user, setUser, upiId, setUpiId }}>
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