import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { MessageSquare, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const stats = [
  {
    title: 'Perguntas Hoje',
    value: '1.247',
    change: '+8% vs ontem',
    trend: 'up' as const,
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: 'Perguntas Este Mês',
    value: '28.450',
    change: '+15% vs mês anterior',
    trend: 'up' as const,
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    title: 'Média por Utilizador',
    value: '182',
    change: 'perguntas/mês',
    trend: 'neutral' as const,
    icon: <Users className="h-6 w-6" />,
  },
];

const topTenants = [
  { name: 'EDP Comercial', questions: 8420, growth: '+12%' },
  { name: 'Galp Energia', questions: 4280, growth: '+8%' },
  { name: 'Endesa Portugal', questions: 3150, growth: '+22%' },
  { name: 'Goldenergy', questions: 2840, growth: '+5%' },
  { name: 'Luzboa', questions: 1240, growth: '+18%' },
];

const alerts = [
  {
    type: 'growth',
    message: 'Endesa Portugal com crescimento de 22% - considerar upgrade de plano',
    time: 'Há 2 horas',
  },
  {
    type: 'usage',
    message: 'EDP Comercial a aproximar-se do limite de tokens mensal',
    time: 'Há 4 horas',
  },
  {
    type: 'inactive',
    message: 'Iberdrola PT sem atividade há 14 dias',
    time: 'Há 1 dia',
  },
];

export default function GlobalMetrics() {
  return (
    <DashboardLayout
      title="Métricas Globais"
      description="Análise de utilização da plataforma"
    >
      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top Tenants */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Top Tenants por Utilização
            </h3>
            <p className="text-sm text-muted-foreground">
              Perguntas realizadas este mês
            </p>
          </div>
          <div className="divide-y divide-border">
            {topTenants.map((tenant, index) => (
              <div
                key={tenant.name}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="font-medium text-foreground">
                    {tenant.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {tenant.questions.toLocaleString('pt-PT')}
                  </p>
                  <p className="text-sm text-success">{tenant.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Alertas e Notificações
            </h3>
            <p className="text-sm text-muted-foreground">
              Eventos que requerem atenção
            </p>
          </div>
          <div className="divide-y divide-border">
            {alerts.map((alert, index) => (
              <div key={index} className="flex gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning/10">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
