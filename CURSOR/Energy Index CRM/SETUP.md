# 🚀 Guia de Setup Rápido - EPIC 1

## Passo a Passo

### 1. Instalar dependências
```bash
pnpm install
```

### 2. Configurar Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Vá a **Settings > API** e copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ nunca expor no cliente)

3. Vá a **Settings > Database** e copie a **Connection string (URI)**
   - Substitua `[YOUR-PASSWORD]` pela password do projeto
   - Adicione `?pgbouncer=true&connection_limit=1` no final
   - Exemplo: `postgresql://postgres:SUA_PASSWORD@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1`

### 3. Criar ficheiro .env

Copie `env.example` para `.env` e preencha:

```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

Edite `.env` com os valores do Supabase.

### 4. Aplicar schema do Prisma

```bash
# Gerar Prisma Client
pnpm db:generate

# Aplicar schema (escolha uma opção):

# Opção A: db:push (rápido, desenvolvimento)
pnpm db:push

# Opção B: db:migrate (recomendado, cria migrations)
pnpm db:migrate
# Quando pedir nome da migration: "init"
```

### 5. Aplicar RLS Policies

1. No Supabase Dashboard, vá a **SQL Editor**
2. Abra o ficheiro `supabase/sql/rls_policies.sql`
3. Copie todo o conteúdo e execute no SQL Editor
4. Verifique que não há erros

### 6. Executar o projeto

```bash
pnpm dev
```

Aceda a `http://localhost:3000`

### 7. Testar

1. Clique em "Registe-se"
2. Crie uma conta (email + password)
3. Será redirecionado para `/dashboard`
4. O perfil será criado automaticamente

## ✅ Checklist de Verificação

- [ ] Dependências instaladas (`pnpm install`)
- [ ] Ficheiro `.env` criado e preenchido
- [ ] Prisma Client gerado (`pnpm db:generate`)
- [ ] Schema aplicado ao banco (`pnpm db:push` ou `pnpm db:migrate`)
- [ ] RLS policies aplicadas no Supabase SQL Editor
- [ ] Projeto executa sem erros (`pnpm dev`)
- [ ] Consegue criar conta e fazer login
- [ ] Dashboard carrega e mostra contadores (0 clientes, 0 CPEs, 0 simulações)

## 🐛 Problemas Comuns

### "Prisma Client not generated"
```bash
pnpm db:generate
```

### "Database connection error"
- Verifique a `DATABASE_URL` no `.env`
- Confirme que a password está correta
- Teste a conexão no Supabase Dashboard > Database > Connection Pooling

### "RLS policy violation"
- Execute novamente `supabase/sql/rls_policies.sql` no SQL Editor
- Verifique se todas as policies foram criadas (consulte `pg_policies`)

### "User profile not found"
- O perfil é criado automaticamente no dashboard
- Se persistir, faça logout e login novamente

## 📚 Próximos Passos

Após concluir este setup, o **EPIC 1** está completo. Pode avançar para o **EPIC 2** (Mini CRM).

