# Como Aplicar Migrations no Supabase

## Opção 1: Via SQL Editor (Recomendado)

1. Aceda ao [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione o projeto: `gpicejqhlvjisgyohnpx`
3. Vá a **SQL Editor** (menu lateral)
4. Clique em **New Query**
5. Copie e cole o conteúdo do ficheiro `supabase/migrations/20240101000000_initial_setup.sql`
6. Clique em **Run** (ou pressione `Ctrl+Enter`)

## Opção 2: Via Supabase CLI

Se tiver o Supabase CLI instalado:

```bash
# Instalar Supabase CLI (se ainda não tiver)
npm install -g supabase

# Fazer login
supabase login

# Ligar ao projeto
supabase link --project-ref gpicejqhlvjisgyohnpx

# Aplicar migration
supabase db push
```

## Opção 3: Via MCP (quando configurado)

Após reconfigurar o MCP com a organização correta, pode usar:

```bash
# No Cursor, usar o comando MCP para aplicar migrations
```

## Verificar se foi aplicado

Após aplicar a migration:

1. Vá a **Table Editor** no dashboard
2. Deve ver as tabelas:
   - `tenants`
   - `users`
3. Vá a **Authentication** > **Policies**
4. Deve ver as políticas RLS criadas

## Próximos Passos

Após aplicar a migration inicial:

1. ✅ Tabelas base criadas
2. ✅ RLS ativado
3. ⏭️ Criar primeiro tenant (MASTER)
4. ⏭️ Criar primeiro utilizador MASTER
5. ⏭️ Testar autenticação

## Troubleshooting

### Erro: "relation already exists"
- As tabelas já existem
- Pode ignorar ou usar `DROP TABLE` se quiser recriar (⚠️ cuidado com dados)

### Erro: "permission denied"
- Verifique se está a usar a conta correta
- Verifique permissões do projeto

### Erro: "foreign key constraint"
- A tabela `auth.users` deve existir (criada automaticamente pelo Supabase Auth)
- Se não existir, ative Authentication no dashboard primeiro

