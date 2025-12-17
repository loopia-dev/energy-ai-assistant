import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Building2, Users, TrendingUp, Coins, MessageSquare, Zap } from 'lucide-react';

const stats = [
  {
    title: 'Total de Tenants',
    value: 24,
    change: '+3 este mês',
    trend: 'up' as const,
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    title: 'Tenants Ativos',
    value: 21,
    change: '87.5%',
    trend: 'up' as const,
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: 'MRR Total',
    value: '€4.850',
    change: '+12% vs mês anterior',
    trend: 'up' as const,
    icon: <Coins className="h-6 w-6" />,
  },
  {
    title: 'Utilizadores Totais',
    value: 156,
    change: '+18 este mês',
    trend: 'up' as const,
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'Perguntas Hoje',
    value: '1.247',
    change: '+8% vs ontem',
    trend: 'up' as const,
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: 'Tokens Consumidos',
    value: '2.4M',
    change: 'Estimativa mensal',
    trend: 'neutral' as const,
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

const recentTenants = [
  { name: 'EDP Comercial', plan: 'Ultra', users: 45, status: 'active' },
  { name: 'Galp Energia', plan: 'Pro', users: 12, status: 'active' },
  { name: 'Endesa Portugal', plan: 'Pro', users: 8, status: 'active' },
  { name: 'Iberdrola PT', plan: 'Basic', users: 1, status: 'pending' },
  { name: 'Goldenergy', plan: 'Pro', users: 5, status: 'active' },
];

export default function MasterDashboard() {
  return (
    <DashboardLayout
      title="Dashboard Global"
      description="Visão geral da plataforma EnergyAI"
    >
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent Tenants */}
      <div className="mt-8">
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Tenants Recentes
            </h3>
            <p className="text-sm text-muted-foreground">
              Últimas empresas registadas na plataforma
            </p>
          </div>
          <div className="divide-y divide-border">
            {recentTenants.map((tenant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
                    {tenant.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{tenant.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Plano {tenant.plan}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {tenant.users} utilizadores
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tenant.status === 'active' ? 'Ativo' : 'Pendente'}
                    </p>
                  </div>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      tenant.status === 'active' ? 'bg-success' : 'bg-warning'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
