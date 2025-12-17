import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MessageSquare, Lightbulb, BookOpen, HelpCircle } from 'lucide-react';

const exampleQuestions = [
  {
    category: 'Conceitos Técnicos',
    icon: <BookOpen className="h-5 w-5" />,
    questions: [
      '"Qual a diferença entre BTN e BTE?"',
      '"Explica o que é a potência contratada"',
      '"O que são horas de vazio e super vazio?"',
      '"Como funciona a tarifa bi-horária?"',
    ],
  },
  {
    category: 'Apoio Comercial',
    icon: <MessageSquare className="h-5 w-5" />,
    questions: [
      '"Como explicar a fatura a um cliente?"',
      '"Quais argumentos usar para mudar de comercializador?"',
      '"Como responder a objeções sobre preços?"',
      '"O que dizer quando perguntam sobre energia verde?"',
    ],
  },
  {
    category: 'Dicas Práticas',
    icon: <Lightbulb className="h-5 w-5" />,
    questions: [
      '"Resume isto como se eu fosse novo"',
      '"Explica de forma simples para o cliente"',
      '"Dá-me um script para esta situação"',
      '"Quais perguntas fazer para qualificar o cliente?"',
    ],
  },
];

const tips = [
  'Seja específico na sua pergunta para obter respostas mais precisas',
  'Pode pedir para explicar conceitos "de forma simples" ou "para um cliente"',
  'Use o histórico para continuar conversas anteriores',
  'Se a resposta não for clara, peça para reformular ou dar exemplos',
];

export default function AgentHelp() {
  return (
    <DashboardLayout
      title="Ajuda Rápida"
      description="Exemplos de como utilizar o assistente de IA"
    >
      {/* Example Questions */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {exampleQuestions.map((category) => (
          <div
            key={category.category}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {category.icon}
              </div>
              <h3 className="font-semibold text-foreground">
                {category.category}
              </h3>
            </div>
            <ul className="space-y-3">
              {category.questions.map((question, index) => (
                <li
                  key={index}
                  className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground"
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-foreground">
            Dicas para Melhores Resultados
          </h3>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {index + 1}
              </span>
              <span className="text-sm text-muted-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Admin */}
      <div className="mt-8 rounded-xl border border-muted bg-muted/30 p-6 text-center">
        <p className="text-muted-foreground">
          Precisa de ajuda adicional? Contacte o administrador da sua empresa.
        </p>
      </div>
    </DashboardLayout>
  );
}
