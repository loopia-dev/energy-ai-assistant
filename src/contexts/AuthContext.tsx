import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  currentRole: UserRole | null;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: Record<UserRole, User> = {
  master: {
    id: '1',
    name: 'João Silva',
    email: 'master@energyai.pt',
    role: 'master',
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
  admin: {
    id: '2',
    name: 'Maria Santos',
    email: 'admin@empresa.pt',
    role: 'admin',
    tenantId: 'tenant-1',
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
  agent: {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@empresa.pt',
    role: 'agent',
    tenantId: 'tenant-1',
    isActive: true,
    lastLogin: new Date().toISOString(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUsers.master);

  const switchRole = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        currentRole: user?.role || null,
        switchRole,
      }}
    >
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
