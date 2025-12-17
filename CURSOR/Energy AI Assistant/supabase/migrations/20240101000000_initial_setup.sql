-- ============================================
-- Migration: Initial Setup
-- Descrição: Criação das tabelas base do sistema
-- ============================================
-- 
-- NOTA: Esta é uma migration de exemplo.
-- Adapte conforme necessário antes de aplicar.
-- 
-- Ordem de execução:
-- 1. tenants
-- 2. users (depende de tenants)
-- 3. Outras tabelas
-- 4. RLS Policies
-- 5. Índices
-- ============================================

-- ============================================
-- 1. TABELA: tenants
-- ============================================
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    plan TEXT NOT NULL CHECK (plan IN ('basic', 'pro', 'ultra')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
    openai_api_key TEXT, -- Será encriptado em produção
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.tenants IS 'Tabela de tenants (clientes) do sistema multitenant';
COMMENT ON COLUMN public.tenants.openai_api_key IS 'OpenAI API Key do tenant (BYOK - Bring Your Own Key)';

-- ============================================
-- 2. TABELA: users (extensão do auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('MASTER', 'TENANT_ADMIN', 'AGENT')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.users IS 'Extensão da tabela auth.users com informações de tenant e role';
COMMENT ON COLUMN public.users.role IS 'Role do utilizador: MASTER (proprietário), TENANT_ADMIN (admin do tenant), AGENT (utilizador final)';

-- ============================================
-- 3. ÍNDICES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON public.users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON public.tenants(status);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Ativar RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. POLÍTICAS RLS - tenants
-- ============================================

-- MASTER pode ver todos os tenants
CREATE POLICY "master_can_view_all_tenants"
    ON public.tenants
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid()
            AND role = 'MASTER'
        )
    );

-- Utilizadores podem ver o seu próprio tenant
CREATE POLICY "users_can_view_own_tenant"
    ON public.tenants
    FOR SELECT
    USING (
        id = (
            SELECT tenant_id FROM public.users
            WHERE id = auth.uid()
        )
    );

-- ============================================
-- 6. POLÍTICAS RLS - users
-- ============================================

-- MASTER pode ver todos os utilizadores
CREATE POLICY "master_can_view_all_users"
    ON public.users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid()
            AND role = 'MASTER'
        )
    );

-- Utilizadores podem ver utilizadores do mesmo tenant
CREATE POLICY "users_can_view_same_tenant"
    ON public.users
    FOR SELECT
    USING (
        tenant_id = (
            SELECT tenant_id FROM public.users
            WHERE id = auth.uid()
        )
    );

-- ============================================
-- NOTAS IMPORTANTES:
-- ============================================
-- 
-- 1. Esta migration cria apenas as tabelas base.
-- 2. Outras tabelas (chat_logs, documents, invoices, etc.)
--    serão criadas em migrations futuras.
-- 3. As políticas RLS são básicas e podem precisar de ajustes.
-- 4. Em produção, considere encriptar openai_api_key.
-- 
-- ============================================

