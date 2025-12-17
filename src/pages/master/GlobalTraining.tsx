import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Trash2, Eye, Save } from 'lucide-react';

const globalDocuments = [
  {
    id: '1',
    name: 'Regulamento_Tarifas_ERSE_2024.pdf',
    size: '2.4 MB',
    uploadedAt: '2024-01-10',
    type: 'PDF',
  },
  {
    id: '2',
    name: 'Manual_Comercial_Energia.docx',
    size: '1.8 MB',
    uploadedAt: '2024-02-15',
    type: 'DOCX',
  },
  {
    id: '3',
    name: 'FAQ_Clientes_BTN_BTE.pdf',
    size: '890 KB',
    uploadedAt: '2024-03-20',
    type: 'PDF',
  },
  {
    id: '4',
    name: 'Legislacao_Energia_Portugal.pdf',
    size: '5.2 MB',
    uploadedAt: '2024-04-05',
    type: 'PDF',
  },
];

export default function GlobalTraining() {
  const [promptMaster, setPromptMaster] = useState(
    `Tu és um assistente especializado em energia, focado no mercado português. O teu objetivo é ajudar comerciais e agentes de energia a:

1. Esclarecer dúvidas técnicas sobre tarifas, regulamentos e legislação
2. Fornecer respostas claras e práticas para questões comerciais
3. Explicar conceitos complexos de forma simples

Regras:
- Responde sempre em português de Portugal
- Sê conciso mas completo
- Cita fontes quando relevante
- Se não souberes, admite e sugere contactar suporte técnico`
  );

  return (
    <DashboardLayout
      title="Treino do Agente Global"
      description="Gerir o conhecimento base partilhado por todos os tenants"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Documents Section */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Documentos Globais
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fontes de conhecimento partilhadas
                </p>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>

            <div className="space-y-3">
              {globalDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.size} • {doc.type} •{' '}
                        {new Date(doc.uploadedAt).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Version Info */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Versão do Conhecimento
            </h3>
            <p className="mt-2 text-muted-foreground">
              Última atualização:{' '}
              <span className="font-medium text-foreground">
                15 de Dezembro, 2024 às 14:32
              </span>
            </p>
            <p className="text-muted-foreground">
              Total de documentos:{' '}
              <span className="font-medium text-foreground">
                {globalDocuments.length}
              </span>
            </p>
          </div>
        </div>

        {/* Prompt Master Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Prompt Master Global
              </h3>
              <p className="text-sm text-muted-foreground">
                Instruções base do assistente de IA
              </p>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Instruções do Sistema</Label>
              <Textarea
                id="prompt"
                value={promptMaster}
                onChange={(e) => setPromptMaster(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Este prompt é aplicado a todas as conversas em todos os tenants.
              Cada tenant pode adicionar instruções adicionais específicas.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
