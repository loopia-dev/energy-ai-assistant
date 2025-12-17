# Arquitetura do Sistema

## Visão Geral

O Energy AI Assistant é uma aplicação **micro-SaaS B2B multitenant** com arquitetura separada entre frontend e backend.

## Componentes Principais

### Frontend (`energy-ai-assistant/`)
- **Tecnologia**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS
- **Estado**: React Query para cache e sincronização
- **Autenticação**: Supabase Auth (cliente-side)

### Backend (`server/`)
- **Tecnologia**: Node.js + Express + TypeScript
- **Autenticação**: Validação de tokens JWT do Supabase
- **Autorização**: Middleware baseado em roles e tenant_id
- **API**: RESTful (a expandir)

### Base de Dados (`supabase/`)
- **Tecnologia**: PostgreSQL (via Supabase)
- **Autenticação**: Supabase Auth
- **Segurança**: Row Level Security (RLS) para isolamento multitenant
- **Migrations**: SQL versionado em `supabase/migrations/`

## Fluxo de Autenticação

```
1. Utilizador faz login no frontend
   ↓
2. Supabase Auth retorna JWT token
   ↓
3. Frontend envia token no header Authorization
   ↓
4. Backend valida token com Supabase
   ↓
5. Backend busca tenant_id e role do utilizador
   ↓
6. Request processado com contexto do utilizador
```

## Isolamento Multitenant

### Princípios

1. **tenant_id em todas as tabelas** (exceto tabelas globais MASTER)
2. **RLS no Supabase** garante isolamento a nível de base de dados
3. **Middleware no backend** valida acesso antes de processar requests
4. **Roles hierárquicos**: MASTER > TENANT_ADMIN > AGENT

### Exemplo de Isolamento

```sql
-- RLS Policy exemplo
CREATE POLICY "tenant_isolation"
ON chat_logs
USING (
  tenant_id = (
    SELECT tenant_id FROM users WHERE id = auth.uid()
  )
);
```

## Estrutura de Dados

### Tabelas Principais

- **tenants**: Informações dos clientes (tenants)
- **users**: Extensão de auth.users com tenant_id e role
- **chat_logs**: Histórico de conversas (a implementar)
- **documents**: Documentos para RAG (a implementar)
- **invoices**: Faturas processadas (a implementar)
- **proposals**: Propostas comerciais (a implementar)

Ver `docs/schemassupabase.md` para schema completo.

## Segurança

### Camadas de Segurança

1. **Frontend**: Validação de formulários, sanitização
2. **Backend**: Validação de tokens, autorização por role
3. **Database**: RLS policies, constraints, encriptação

### Credenciais

- **Supabase Service Role Key**: Apenas no backend (nunca no frontend)
- **OpenAI API Keys**: BYOK (cada tenant tem a sua, encriptada)
- **JWT Tokens**: Validados em cada request

## BYOK (Bring Your Own Key)

Cada tenant fornece a sua própria OpenAI API Key:
- Armazenada em `tenants.openai_api_key` (encriptada)
- Usada apenas no backend para chamadas à API OpenAI
- Nunca exposta ao frontend
- Permite controlo de custos por tenant

## Escalabilidade

### Atual (MVP)
- Backend monolítico (Express)
- Base de dados única (Supabase)
- Sem cache distribuído

### Futuro (se necessário)
- Microserviços por domínio
- Cache Redis para sessões e dados frequentes
- Queue para processamento assíncrono (ex: OCR de faturas)

## Observabilidade

### Logs
- Backend: Console logs (a expandir para sistema centralizado)
- Database: Logs do Supabase

### Métricas (a implementar)
- Uso de OpenAI por tenant
- Número de requests
- Tempo de resposta
- Erros e exceções

## Deploy

### Desenvolvimento
- Frontend: `npm run dev` (Vite dev server)
- Backend: `npm run dev` (tsx watch)
- Database: Supabase local ou cloud

### Produção (a definir)
- Frontend: Vercel / Netlify / Cloudflare Pages
- Backend: Railway / Render / AWS / GCP
- Database: Supabase Cloud

## Próximos Passos

1. Implementar rotas de API no backend
2. Criar migrations para todas as tabelas
3. Implementar lógica de negócio (chat, faturas, etc.)
4. Configurar CI/CD
5. Setup de ambientes (staging, produção)

---

**Última atualização**: Janeiro 2024

