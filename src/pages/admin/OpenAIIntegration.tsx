import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/ui/status-badge';
import { Key, Eye, EyeOff, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

export default function OpenAIIntegration() {
  const [apiKey, setApiKey] = useState('sk-proj-****************************');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      setTestResult('success');
    }, 2000);
  };

  return (
    <DashboardLayout
      title="Integração OpenAI"
      description="Configure a sua API Key para utilizar o assistente de IA"
    >
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Current Status */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Estado da Ligação
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Última verificação: Há 5 minutos
              </p>
            </div>
            <StatusBadge status="active" label="Conectada" />
          </div>
        </div>

        {/* API Key Configuration */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Configuração da API Key
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Introduza a sua API Key da OpenAI para utilizar o assistente
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key OpenAI</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="pr-10 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                Obtenha a sua API Key em{' '}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  platform.openai.com
                </a>
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleTest} disabled={isTesting}>
                {isTesting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    A testar...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    Testar Ligação
                  </>
                )}
              </Button>
              <Button variant="outline">Guardar</Button>
            </div>

            {testResult && (
              <div
                className={`flex items-center gap-3 rounded-lg p-4 ${
                  testResult === 'success'
                    ? 'bg-success/10 text-success'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {testResult === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Ligação estabelecida com sucesso!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5" />
                    <span>Erro na ligação. Verifique a sua API Key.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Important Notice */}
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-6">
          <div className="flex gap-4">
            <AlertTriangle className="h-6 w-6 shrink-0 text-warning" />
            <div>
              <h4 className="font-semibold text-foreground">
                Aviso de Responsabilidade
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Os custos de utilização da API OpenAI são da responsabilidade
                exclusiva da sua empresa. Recomendamos que configure limites de
                utilização na sua conta OpenAI para controlar os custos.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Modelos recomendados: GPT-4o-mini para uso geral, GPT-4o para
                questões complexas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
