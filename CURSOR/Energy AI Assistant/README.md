# Energy AI Assistant

Micro-SaaS B2B multitenant para agentes e comerciais de energia, com agentes IA especializados, leitura de faturas, cálculo de tarifas indexadas (OMIE) e geração de propostas comerciais em PDF.

## 📋 Descrição do Projeto

Plataforma SaaS que permite a agentes de energia:
- **Chat IA especializado** em energia (eletricidade e gás) para o mercado português
- **Leitura automática de faturas** com extração de dados via IA
- **Cálculo de tarifas indexadas** baseado em dados OMIE/MIBEL
- **Geração de propostas comerciais** em PDF profissional

### Modelo de Negócio

- **Multitenant**: Cada cliente (tenant) tem isolamento total de dados
- **BYOK (Bring Your Own Key)**: Cada tenant usa a sua própria OpenAI API key
- **Planos**: Basic (47€/mês), Pro (97€/mês), Ultra (197€/mês)
- **Roles**: MASTER (proprietário), TENANT_ADMIN (administrador), AGENT (utilizador final)

## 🛠 Stack Tecnológica

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Query (TanStack Query)

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Security**: Helmet, CORS

### Infraestrutura
- **Database & Auth**: Supabase
- **Billing**: Stripe (a implementar)
- **Automations**: n8n (a implementar)
- **Hosting**: A definir

## 📁 Estrutura do Projeto

```
.
├── docs/                          # Documentação do projeto
│   ├── promptmaster.md           # Prompt Master do Agente IA (NÃO ALTERAR)
│   ├── schemassupabase.md        # Schema do banco de dados
│   ├── PRD.md                    # Product Requirements Document
│   └── epics.md                  # Épicos e roadmap
├── energy-ai-assistant/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── pages/               # Páginas da aplicação
│   │   ├── contexts/            # Context providers
│   │   ├── hooks/               # Custom hooks
│   │   └── lib/                 # Utilitários
│   └── package.json
├── server/                       # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/              # Configurações (Supabase, etc)
│   │   ├── middleware/          # Middlewares (auth, etc)
│   │   ├── types/               # TypeScript types
│   │   └── index.ts             # Entry point
│   └── package.json
├── supabase/
│   └── migrations/              # SQL migrations do Supabase
└── README.md                     # Este ficheiro
```

## 🚀 Setup Local

### Pré-requisitos

- Node.js 20+ e npm/yarn
- Conta Supabase (projeto criado)
- Git

### 1. Clonar o repositório

```bash
git clone <repository-url>
cd "Energy AI Assistant"
```

### 2. Configurar Backend

```bash
# Entrar na pasta do servidor
cd server

# Instalar dependências
npm install

# Copiar ficheiro de ambiente
cp .env.example .env

# Editar .env com as credenciais do Supabase
# - SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY
# - SUPABASE_ANON_KEY
```

### 3. Configurar Frontend

```bash
# Voltar à raiz e entrar na pasta do frontend
cd ../energy-ai-assistant

# Instalar dependências
npm install

# O frontend já está configurado para usar Supabase
# Certifique-se de que as variáveis de ambiente estão configuradas
```

### 4. Configurar Supabase

1. Criar projeto no [Supabase](https://supabase.com)
2. Obter as credenciais (URL, anon key, service role key)
3. Aplicar migrations (quando disponíveis):
   ```bash
   # Usando Supabase CLI
   supabase migration up
   ```

### 5. Iniciar Servidores

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd energy-ai-assistant
npm run dev
```

O backend estará disponível em `http://localhost:3001`  
O frontend estará disponível em `http://localhost:5173`

## 📚 Documentação

### Documentos Importantes

- **[Prompt Master](./docs/promptmaster.md)**: Definição do comportamento do Agente IA (⚠️ NÃO ALTERAR)
- **[Schema Supabase](./docs/schemassupabase.md)**: Estrutura do banco de dados e políticas RLS
- **[PRD](./docs/PRD.md)**: Product Requirements Document
- **[Épicos](./docs/epics.md)**: Roadmap e épicos do projeto

### Agente IA

O Agente IA é especializado em energia para o mercado português. O seu comportamento é definido no [Prompt Master](./docs/promptmaster.md), que estabelece:

- Identidade e objetivos do agente
- Âmbito de conhecimento (eletricidade, gás, tarifas, etc.)
- Forma de responder (pedagógica, prática)
- Limitações e regras de segurança

**⚠️ IMPORTANTE**: O ficheiro `docs/promptmaster.md` é referência e não deve ser alterado sem aprovação.

## 🔐 Segurança

### Multitenancy

- **Isolamento por tenant_id**: Todos os dados são isolados por tenant
- **RLS (Row Level Security)**: Políticas no Supabase garantem isolamento
- **Roles**: MASTER, TENANT_ADMIN, AGENT com permissões diferentes

### Credenciais

- **NUNCA** commitar ficheiros `.env` com credenciais reais
- **Service Role Key** apenas no backend (nunca no frontend)
- **OpenAI API Keys** são BYOK (cada tenant tem a sua)

## 🗄 Migrations

As migrations SQL do Supabase estão em `supabase/migrations/`.

Ver [supabase/migrations/README.md](./supabase/migrations/README.md) para instruções detalhadas.

## 🧪 Desenvolvimento

### Scripts Disponíveis

**Backend:**
```bash
cd server
npm run dev      # Desenvolvimento com hot-reload
npm run build    # Build para produção
npm run start    # Executar build de produção
npm run lint     # Linter
```

**Frontend:**
```bash
cd energy-ai-assistant
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

### Convenções de Código

- **TypeScript**: Tipagem estrita
- **ESLint**: Linting automático
- **Comentários**: Código documentado e extensível
- **Estrutura**: Organização modular e escalável

## 📊 Roadmap

Ver [docs/epics.md](./docs/epics.md) para o roadmap completo.

**Ordem recomendada:**
1. ✅ EPIC 0: Base técnica (este épico)
2. 🔐 EPIC 1: Autenticação, Tenants e Roles
3. 💳 EPIC 2: Billing & Planos
4. 🧠 EPIC 3: Agente IA Conversacional (Core)
5. 📚 EPIC 4+: Funcionalidades avançadas

## 🤝 Contribuição

Este é um projeto privado. Para questões ou sugestões, contacte a equipa de desenvolvimento.

## 📝 Licença

Proprietário - Todos os direitos reservados.

---

**Nota**: Este projeto está em desenvolvimento ativo. A documentação será atualizada conforme o progresso.

