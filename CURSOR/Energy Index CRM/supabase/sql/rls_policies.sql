-- Row Level Security (RLS) Policies para Energy Index CRM
-- Execute estas queries no Supabase SQL Editor após criar as tabelas via Prisma

-- Habilitar RLS em todas as tabelas
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE cpes ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE omie_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USER_PROFILES
-- ============================================
-- Utilizadores podem ver/editar o seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Masters podem ver todos os perfis
CREATE POLICY "Masters can view all profiles"
  ON user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'master'
    )
  );

-- ============================================
-- CLIENTS
-- ============================================
-- Consultores só veem os seus próprios clientes
CREATE POLICY "Consultors can view own clients"
  ON clients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Consultors can create own clients"
  ON clients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Consultors can update own clients"
  ON clients FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Consultors can delete own clients"
  ON clients FOR DELETE
  USING (auth.uid() = user_id);

-- Masters podem ver todos os clientes
CREATE POLICY "Masters can view all clients"
  ON clients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'master'
    )
  );

-- ============================================
-- CPES
-- ============================================
-- Consultores só veem os seus próprios CPEs
CREATE POLICY "Consultors can view own cpes"
  ON cpes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Consultors can create own cpes"
  ON cpes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Consultors can update own cpes"
  ON cpes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Consultors can delete own cpes"
  ON cpes FOR DELETE
  USING (auth.uid() = user_id);

-- Masters podem ver todos os CPEs
CREATE POLICY "Masters can view all cpes"
  ON cpes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'master'
    )
  );

-- ============================================
-- SIMULATIONS
-- ============================================
-- Consultores só veem as suas próprias simulações
CREATE POLICY "Consultors can view own simulations"
  ON simulations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Consultors can create own simulations"
  ON simulations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Consultors can update own simulations"
  ON simulations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Consultors can delete own simulations"
  ON simulations FOR DELETE
  USING (auth.uid() = user_id);

-- Masters podem ver todas as simulações
CREATE POLICY "Masters can view all simulations"
  ON simulations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'master'
    )
  );

-- ============================================
-- OMIE_PRICES
-- ============================================
-- Todos os utilizadores autenticados podem ler preços OMIE (dados públicos)
CREATE POLICY "Authenticated users can view omie prices"
  ON omie_prices FOR SELECT
  USING (auth.role() = 'authenticated');

-- Apenas service role pode inserir/atualizar (via API server-side)
-- Não criamos policy de INSERT/UPDATE aqui - será feito via service role key

-- ============================================
-- LICENSES
-- ============================================
-- Utilizadores podem ver a sua própria licença
CREATE POLICY "Users can view own license"
  ON licenses FOR SELECT
  USING (auth.uid() = user_id);

-- Masters podem ver todas as licenças
CREATE POLICY "Masters can view all licenses"
  ON licenses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'master'
    )
  );

-- Apenas service role pode inserir/atualizar licenças (via webhook Stripe)
-- Não criamos policy de INSERT/UPDATE aqui - será feito via service role key

