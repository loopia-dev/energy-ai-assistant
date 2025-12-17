# Configuração de Variáveis de Ambiente

Este documento descreve as variáveis de ambiente necessárias para o backend.

## Criar ficheiro .env

Crie um ficheiro `.env` na pasta `server/` com as seguintes variáveis:

```env
# ============================================
# Ambiente
# ============================================
NODE_ENV=development
PORT=3001

# ============================================
# Frontend
# ============================================
FRONTEND_URL=http://localhost:5173

# ============================================
# Supabase Configuration
# ============================================
# URL do projeto Supabase (encontra-se no dashboard do Supabase)
SUPABASE_URL=https://your-project.supabase.co

# Service Role Key (NUNCA exponha no frontend - apenas backend)
# Encontra-se em: Settings > API > service_role key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Anon/Public Key (pode ser usado no frontend)
# Encontra-se em: Settings > API > anon public key
SUPABASE_ANON_KEY=your-anon-key-here

# ============================================
# OpenAI (opcional - para testes locais)
# ============================================
# NOTA: Em produção, cada tenant terá a sua própria API key (BYOK)
# Esta é apenas para desenvolvimento/testes
OPENAI_API_KEY=sk-your-openai-key-here

# ============================================
# Segurança
# ============================================
# JWT Secret (se necessário para tokens customizados)
JWT_SECRET=your-jwt-secret-here

# ============================================
# Logging
# ============================================
LOG_LEVEL=info
```

## Como obter as credenciais do Supabase

1. Aceda ao [Dashboard do Supabase](https://app.supabase.com)
2. Selecione o seu projeto
3. Vá a **Settings** > **API**
4. Copie:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ SECRETO - apenas backend)

## Segurança

⚠️ **IMPORTANTE**:
- NUNCA commite o ficheiro `.env` com credenciais reais
- O ficheiro `.env` está no `.gitignore`
- A `SUPABASE_SERVICE_ROLE_KEY` tem privilégios administrativos - use apenas no backend
- Em produção, use variáveis de ambiente do servidor/hosting

## Validação

O servidor valida as variáveis obrigatórias no arranque:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Se alguma estiver em falta, o servidor não iniciará e mostrará um erro claro.

