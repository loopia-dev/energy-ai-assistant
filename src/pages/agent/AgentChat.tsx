import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      'Olá! Sou o assistente especializado em energia. Como posso ajudá-lo hoje?',
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  'Qual a diferença entre BTN e BTE?',
  'Como explicar a potência contratada a um cliente?',
  'Quais são as tarifas de acesso às redes?',
  'Explica o conceito de horas de vazio',
];

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (content: string = input) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'Qual a diferença entre BTN e BTE?':
          'BTN (Baixa Tensão Normal) e BTE (Baixa Tensão Especial) diferem principalmente na potência contratada:\n\n• **BTN**: Potência ≤ 41,4 kVA. Destinada a consumidores domésticos e pequenos comércios.\n\n• **BTE**: Potência > 41,4 kVA e ≤ 100 kVA. Para empresas com maior consumo.\n\nA BTE tem geralmente tarifas de energia mais competitivas, mas requer um contador de telecontagem e tem custos fixos de potência mais elevados.',
        'Como explicar a potência contratada a um cliente?':
          'A **potência contratada** é como a "largura do cano" que traz eletricidade à sua casa.\n\nImagine assim:\n• Se tiver muitos aparelhos ligados ao mesmo tempo (forno, ar condicionado, máquina de lavar), precisa de um "cano" maior\n• Uma potência insuficiente faz o disjuntor disparar\n\n**Dica prática**: Some a potência dos aparelhos que usa em simultâneo. Para uma família típica, 6,9 kVA costuma ser suficiente.',
        default:
          'Obrigado pela sua pergunta. Com base no meu conhecimento sobre o mercado energético português, posso dizer-lhe que esta é uma questão importante para os comerciais de energia.\n\nPosso fornecer mais detalhes específicos se me indicar o contexto exato da sua dúvida.',
      };

      const response = responses[content] || responses.default;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">
              Assistente de Energia
            </h1>
            <p className="text-sm text-muted-foreground">
              Especializado no mercado energético português
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-border bg-card p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  )}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content.split('\n').map((line, i) => (
                      <span key={i}>
                        {line.split('**').map((part, j) =>
                          j % 2 === 1 ? (
                            <strong key={j}>{part}</strong>
                          ) : (
                            part
                          )
                        )}
                        {i < message.content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleSend(question)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="mt-4 flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escreva a sua pergunta..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
