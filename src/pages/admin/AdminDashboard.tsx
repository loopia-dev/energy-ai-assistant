import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Users, MessageSquare, Calendar, Key } from 'lucide-react';

const stats = [
  {
    title: 'Utilizadores Ativos',
    value: 12,
    change: '5 licenças disponíveis',
    trend: 'neutral' as const,
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'Perguntas Hoje',
    value: 87,
    change: '+12% vs ontem',
    trend: 'up' as const,
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: 'Perguntas Este Mês',
    value: '2.450',
    change: '+8% vs mês anterior',
    trend: 'up' as const,
    icon: <Calendar className="h-6 w-6" />,
  },
];

const recentActivity = [
  { user: 'Pedro Costa', action: 'Fez 12 perguntas', time: 'Há 5 min' },
  { user: 'Ana Silva', action: 'Fez 8 perguntas', time: 'Há 15 min' },
  { user: 'João Santos', action: 'Fez 5 perguntas', time: 'Há 32 min' },
  { user: 'Maria Ferreira', action: 'Entrou na plataforma', time: 'Há 1 hora' },
  { user: 'Carlos Oliveira', action: 'Fez 3 perguntas', time: 'Há 2 horas' },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Galp Energia - Visão geral do seu tenant"
    >
      {/* Plan & API Status */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Plano Atual</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                Pro
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Até 5 utilizadores • €97/mês
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-xl font-bold text-primary">P</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">API OpenAI</p>
              <div className="mt-1 flex items-center gap-2">
                <StatusBadge status="active" label="Conectada" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Última verificação: Há 5 min
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <Key className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Atividade Recente
          </h3>
          <p className="text-sm text-muted-foreground">
            Últimas ações dos utilizadores
          </p>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                  {activity.user.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
