import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 47,
    users: '1 utilizador',
    description: 'Ideal para comerciais independentes',
    features: [
      'Acesso ao assistente de IA',
      '1 utilizador incluído',
      'Documentos até 5 MB',
      'Histórico 30 dias',
      'Suporte por email',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 97,
    users: '5 utilizadores',
    description: 'Para equipas comerciais',
    features: [
      'Tudo do Basic, mais:',
      'Até 5 utilizadores',
      'Documentos até 20 MB',
      'Histórico ilimitado',
      'Treino personalizado',
      'Suporte prioritário',
    ],
    highlighted: true,
    current: true,
  },
  {
    id: 'ultra',
    name: 'Ultra',
    price: 197,
    users: 'Utilizadores ilimitados',
    description: 'Para grandes equipas',
    features: [
      'Tudo do Pro, mais:',
      'Utilizadores ilimitados',
      'Documentos ilimitados',
      'API dedicada',
      'Gestor de conta',
      'SLA 99.9%',
    ],
    highlighted: false,
  },
];

export default function Billing() {
  return (
    <DashboardLayout
      title="Planos e Faturação"
      description="Escolha o plano ideal para a sua equipa"
    >
      {/* Notice */}
      <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
        <p className="text-sm text-foreground">
          A gestão do plano é feita pelo Admin do tenant. Para alterar o plano,
          contacte o suporte ou o administrador da sua empresa.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'relative rounded-2xl border bg-card p-8 transition-shadow hover:shadow-lg',
              plan.highlighted
                ? 'border-primary shadow-md'
                : 'border-border'
            )}
          >
            {plan.current && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Plano Atual
                </span>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Zap className={cn(
                  "h-5 w-5",
                  plan.highlighted ? "text-primary" : "text-muted-foreground"
                )} />
                <h3 className="text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  €{plan.price}
                </span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <p className="mt-1 text-sm font-medium text-primary">
                {plan.users}
              </p>
            </div>

            <ul className="mb-8 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={plan.current ? 'outline' : plan.highlighted ? 'default' : 'secondary'}
              disabled={plan.current}
            >
              {plan.current ? 'Plano Atual' : 'Selecionar Plano'}
            </Button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Perguntas Frequentes
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="font-medium text-foreground">
              Posso mudar de plano a qualquer momento?
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Sim, pode fazer upgrade ou downgrade do plano a qualquer momento.
              As alterações são aplicadas no próximo ciclo de faturação.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="font-medium text-foreground">
              Os custos da API OpenAI estão incluídos?
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Não, cada empresa utiliza a sua própria API Key da OpenAI. Os
              custos de utilização são faturados diretamente pela OpenAI.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="font-medium text-foreground">
              Existe período de teste?
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Sim, oferecemos 14 dias de teste gratuito em qualquer plano, sem
              compromisso e sem necessidade de cartão de crédito.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h4 className="font-medium text-foreground">
              Como funciona o suporte?
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Todos os planos incluem suporte por email. Planos Pro e Ultra têm
              acesso a suporte prioritário com resposta em até 4 horas úteis.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
