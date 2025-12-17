export type UserRole = 'master' | 'admin' | 'agent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId?: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  plan: 'basic' | 'pro' | 'ultra';
  isActive: boolean;
  usersCount: number;
  createdAt: string;
  mrr: number;
  apiKeyConfigured: boolean;
}

export interface Plan {
  id: 'basic' | 'pro' | 'ultra';
  name: string;
  price: number;
  usersLimit: number | 'unlimited';
  features: string[];
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}
