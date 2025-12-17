import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Trash2, Eye, Save, AlertCircle } from 'lucide-react';

const tenantDocuments = [
  {
    id: '1',
    name: 'Procedimentos_Internos_Galp.pdf',
    size: '1.2 MB',
    uploadedAt: '2024-11-20',
    type: 'PDF',
  },
  {
    id: '2',
    name: 'Scripts_Vendas_2024.docx',
    size: '450 KB',
    uploadedAt: '2024-12-05',
    type: 'DOCX',
  },
  {
    id: '3',
    name: 'FAQ_Produtos_Galp.pdf',
    size: '780 KB',
    uploadedAt: '2024-12-10',
    type: 'PDF',
  },
];

export default function TenantTraining() {
  const [notes, setNotes] = useState(
    `Notas internas da equipa Galp:

- Promoção ativa até 31/12: 10% desconto no primeiro mês
- Novo produto "Energia Verde Plus" disponível desde Novembro
- Contactar Ana Silva para questões sobre grandes consumidores`
  );

  return (
    <DashboardLayout
      title="Treino do Agente"
      description="Personalize o conhecimento do assistente para a sua empresa"
    >
      {/* Notice */}
      <div className="mb-8 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm text-foreground">
          <span className="font-medium">Nota:</span> O conhecimento adicionado
          aqui é exclusivo da sua empresa e complementa a base de conhecimento
          global da plataforma.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Documents Section */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Documentos Internos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Procedimentos, scripts e materiais da empresa
                </p>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>

            <div className="space-y-3">
              {tenantDocuments.map((doc) => (
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

            {tenantDocuments.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                <FileText className="mx-auto mb-2 h-8 w-8" />
                <p>Nenhum documento carregado</p>
              </div>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Notas Internas
              </h3>
              <p className="text-sm text-muted-foreground">
                Informações rápidas para o assistente considerar
              </p>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (texto simples)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[300px]"
                placeholder="Adicione notas sobre promoções, procedimentos internos, contactos importantes, etc."
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Estas notas são incluídas no contexto das conversas e ajudam o
              assistente a fornecer respostas mais relevantes para a sua equipa.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
