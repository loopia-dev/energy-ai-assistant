# Energy Index CRM

Micro-SaaS "Mini CRM + Simulador OMIE Indexado" construído com Next.js, Supabase, Prisma e Stripe.

## 🚀 EPIC 1 - Fundação do Projeto

Este épico estabelece a base do projeto:
- ✅ Next.js 14 (App Router) + TypeScript
- ✅ Tailwind CSS
- ✅ Supabase Auth (login/register)
- ✅ Prisma ORM ligado ao Supabase Postgres
- ✅ Row Level Security (RLS) policies
- ✅ Estrutura de modelos de dados

## 📋 Pré-requisitos

- Node.js 18+ e pnpm (ou npm/yarn)
- Conta Supabase (projeto criado)
- Acesso ao Supabase SQL Editor

## 🛠️ Setup Local

### 1. Clonar e instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

**Variáveis necessárias:**

- `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anon do Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (apenas server-side)
- `DATABASE_URL`: Connection string do Postgres do Supabase

**Como obter a DATABASE_URL:**
1. No Supabase Dashboard, vá a Settings > Database
2. Copie a "Connection string" (URI)
3. Substitua `[YOUR-PASSWORD]` pela password do seu projeto
4. Adicione `?pgbouncer=true&connection_limit=1` no final

Exemplo:
```
postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

### 3. Criar base de dados e aplicar migrations

```bash
# Gerar Prisma Client
pnpm db:generate

# Aplicar schema ao banco de dados
pnpm db:push

# OU criar migration (recomendado para produção)
pnpm db:migrate
```

### 4. Aplicar RLS Policies

1. Abra o Supabase SQL Editor
2. Execute o ficheiro `supabase/sql/rls_policies.sql`
3. Verifique que todas as policies foram criadas

### 5. Executar o projeto

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🧪 Testar Autenticação

1. Aceda a `http://localhost:3000`
2. Será redirecionado para `/login`
3. Clique em "Registe-se" para criar uma conta
4. Após registo, será redirecionado para `/dashboard`
5. O perfil será criado automaticamente no Prisma

## 📁 Estrutura do Projeto

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard do consultor
│   ├── login/             # Página de login
│   └── register/          # Página de registo
├── components/            # Componentes React
├── lib/                   # Utilitários
│   ├── prisma.ts         # Cliente Prisma
│   └── supabase/         # Clientes Supabase (server/client)
├── prisma/
│   └── schema.prisma     # Schema do Prisma
├── supabase/
│   └── sql/
│       └── rls_policies.sql  # RLS policies
└── middleware.ts          # Middleware Next.js (proteção de rotas)
```

## 🔒 Segurança

- **Row Level Security (RLS)**: Todas as tabelas têm RLS habilitado
- **Policies**: Consultores só veem os seus próprios dados
- **Masters**: Podem ver todos os dados (será implementado no EPIC 6)
- **Service Role Key**: Nunca exposta no cliente, apenas server-side

## 📊 Modelos de Dados

- `UserProfile`: Perfil do utilizador (ligado ao Supabase Auth)
- `Client`: Clientes do consultor
- `CPE`: Contratos de Fornecimento de Energia
- `Simulation`: Simulações de preço OMIE
- `OmiePrice`: Preços históricos OMIE
- `License`: Licenças/Subscrições (Stripe)

## 🎯 Próximos Épicos

- **EPIC 2**: Mini CRM (CRUD Clientes + CPEs)
- **EPIC 3**: OMIE Simulator
- **EPIC 4**: Follow-ups & Alertas
- **EPIC 5**: Stripe Billing
- **EPIC 6**: Master Dashboard
- **EPIC 7**: OMIE Ingest Automático

## 🐛 Troubleshooting

### Erro: "Prisma Client not generated"
```bash
pnpm db:generate
```

### Erro: "Connection refused" ou "Database connection"
- Verifique se a `DATABASE_URL` está correta
- Confirme que o projeto Supabase está ativo
- Verifique se a password está correta

### Erro: "RLS policy violation"
- Certifique-se de que executou `supabase/sql/rls_policies.sql`
- Verifique se o utilizador está autenticado
- Confirme que o `user_id` está correto nos registos

### Erro: "User profile not found"
- O perfil é criado automaticamente no dashboard
- Se persistir, chame manualmente `/api/auth/create-profile` após login

## 📝 Notas

- Este é o **EPIC 1** - apenas a fundação
- Não implementar funcionalidades dos outros épicos nesta branch
- Mantenha a branch `epic/1-foundation-supabase-prisma` limpa

## 📄 Licença

Proprietário - Energy Index CRM

