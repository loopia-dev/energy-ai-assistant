# Supabase Migrations

Esta pasta contém as migrations SQL para o banco de dados Supabase.

## Estrutura

As migrations devem seguir o padrão de nomenclatura:
```
YYYYMMDDHHMMSS_description.sql
```

Exemplo:
```
20240115120000_create_tenants_table.sql
20240115120001_create_users_table.sql
20240115120002_enable_rls_policies.sql
```

## Como usar

### Criar nova migration

```bash
# Usando Supabase CLI
supabase migration new migration_name

# Ou criar manualmente seguindo o padrão de nomenclatura
```

### Aplicar migrations

```bash
# Aplicar todas as migrations pendentes
supabase migration up

# Aplicar até uma migration específica
supabase migration up --target 20240115120000
```

### Reverter migration

```bash
# Reverter última migration
supabase migration down

# Reverter até uma migration específica
supabase migration down --target 20240115120000
```

## Convenções

1. **Ordem de criação**: Sempre criar tabelas base antes das que têm foreign keys
2. **RLS**: Sempre ativar RLS e criar políticas após criar as tabelas
3. **Índices**: Criar índices após criar as tabelas
4. **Comentários**: Documentar tabelas e colunas importantes

## Schema de Referência

Ver `docs/schemassupabase.md` para o schema completo do banco de dados.

## Importante

- ✅ Sempre testar migrations em ambiente de desenvolvimento primeiro
- ✅ Nunca modificar migrations já aplicadas em produção
- ✅ Criar nova migration para alterações em migrations existentes
- ✅ Revisar SQL antes de aplicar em produção

