import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  BarChart3,
  Users,
  Key,
  MessageSquare,
  HelpCircle,
  CreditCard,
  Zap,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles: ('master' | 'admin' | 'agent')[];
}

const navItems: NavItem[] = [
  // Master items
  {
    title: 'Dashboard',
    href: '/master',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['master'],
  },
  {
    title: 'Tenants',
    href: '/master/tenants',
    icon: <Building2 className="h-5 w-5" />,
    roles: ['master'],
  },
  {
    title: 'Treino Global',
    href: '/master/training',
    icon: <BookOpen className="h-5 w-5" />,
    roles: ['master'],
  },
  {
    title: 'Métricas Globais',
    href: '/master/metrics',
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ['master'],
  },
  // Admin items
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Integração OpenAI',
    href: '/admin/openai',
    icon: <Key className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Utilizadores',
    href: '/admin/users',
    icon: <Users className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Treino do Agente',
    href: '/admin/training',
    icon: <BookOpen className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Métricas',
    href: '/admin/metrics',
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ['admin'],
  },
  // Agent items
  {
    title: 'Chat',
    href: '/agent',
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ['agent'],
  },
  {
    title: 'Ajuda',
    href: '/agent/help',
    icon: <HelpCircle className="h-5 w-5" />,
    roles: ['agent'],
  },
  // Shared items
  {
    title: 'Planos',
    href: '/billing',
    icon: <CreditCard className="h-5 w-5" />,
    roles: ['master', 'admin'],
  },
];

export function AppSidebar() {
  const { user, currentRole, switchRole } = useAuth();
  const location = useLocation();

  const filteredItems = navItems.filter(
    (item) => currentRole && item.roles.includes(currentRole)
  );

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Zap className="h-8 w-8 text-sidebar-primary" />
          <span className="text-xl font-semibold">EnergyAI</span>
        </div>

        {/* Role Switcher (Demo) */}
        <div className="border-b border-sidebar-border p-4">
          <p className="mb-2 text-xs uppercase tracking-wider text-sidebar-muted">
            Demo: Trocar Role
          </p>
          <div className="flex gap-1">
            {(['master', 'admin', 'agent'] as const).map((role) => (
              <button
                key={role}
                onClick={() => switchRole(role)}
                className={cn(
                  'flex-1 rounded px-2 py-1 text-xs font-medium transition-colors',
                  currentRole === role
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80'
                )}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-sidebar-muted">{user?.email}</p>
            </div>
          </div>
          <button className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" />
            Terminar Sessão
          </button>
        </div>
      </div>
    </aside>
  );
}
