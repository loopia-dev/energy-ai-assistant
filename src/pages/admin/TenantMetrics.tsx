import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { MessageSquare, Users, Clock, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total de Perguntas',
    value: '2.450',
    change: 'Este mês',
    trend: 'neutral' as const,
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: 'Média por Utilizador',
    value: '196',
    change: '+12% vs mês anterior',
    trend: 'up' as const,
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'Hora de Pico',
    value: '10:00-12:00',
    change: 'Período mais ativo',
    trend: 'neutral' as const,
    icon: <Clock className="h-6 w-6" />,
  },
];

const userStats = [
  { name: 'Pedro Costa', questions: 245, avgPerDay: 8.2 },
  { name: 'Carlos Oliveira', questions: 198, avgPerDay: 6.6 },
  { name: 'Ana Silva', questions: 189, avgPerDay: 6.3 },
  { name: 'João Santos', questions: 156, avgPerDay: 5.2 },
  { name: 'Maria Ferreira', questions: 12, avgPerDay: 0.4 },
];

const hourlyData = [
  { hour: '08:00', questions: 45 },
  { hour: '09:00', questions: 78 },
  { hour: '10:00', questions: 124 },
  { hour: '11:00', questions: 156 },
  { hour: '12:00', questions: 89 },
  { hour: '13:00', questions: 34 },
  { hour: '14:00', questions: 98 },
  { hour: '15:00', questions: 112 },
  { hour: '16:00', questions: 87 },
  { hour: '17:00', questions: 56 },
  { hour: '18:00', questions: 23 },
];

const maxQuestions = Math.max(...hourlyData.map((d) => d.questions));

export default function TenantMetrics() {
  return (
    <DashboardLayout
      title="Métricas"
      description="Análise de utilização da sua equipa"
    >
      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Users by Questions */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Perguntas por Utilizador
            </h3>
            <p className="text-sm text-muted-foreground">Este mês</p>
          </div>
          <div className="divide-y divide-border">
            {userStats.map((user, index) => (
              <div
                key={user.name}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {index + 1}
                  </span>
                  <span className="font-medium text-foreground">
                    {user.name}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {user.questions}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.avgPerDay}/dia
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Distribution */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Distribuição Horária
            </h3>
            <p className="text-sm text-muted-foreground">
              Perguntas por hora (média)
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {hourlyData.map((item) => (
                <div key={item.hour} className="flex items-center gap-4">
                  <span className="w-14 text-sm text-muted-foreground">
                    {item.hour}
                  </span>
                  <div className="flex-1">
                    <div className="h-6 overflow-hidden rounded bg-muted">
                      <div
                        className="h-full rounded bg-primary transition-all"
                        style={{
                          width: `${(item.questions / maxQuestions) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="w-10 text-right text-sm font-medium text-foreground">
                    {item.questions}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
