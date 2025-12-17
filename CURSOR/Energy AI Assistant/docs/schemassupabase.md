1️⃣ PRINCÍPIOS DE MODELAÇÃO (IMPORTANTES)

Regras que seguimos (e não quebramos):

Tudo tem tenant_id (exceto tabelas globais controladas pelo MASTER)

Supabase Auth = autenticação

Base de dados = autorização (RLS)

Roles nunca vêm do frontend

MASTER tem bypass controlado

Logs são imutáveis (append-only)

2️⃣ TABELAS – MODELO DE DADOS (v1)
🔹 tenants
tenants (
  id uuid PK,
  name text,
  plan text, -- basic | pro | ultra
  status text, -- active | suspended
  openai_api_key text, -- encrypted
  created_at timestamp
)

🔹 users (extensão do auth.users)
users (
  id uuid PK, -- auth.users.id
  tenant_id uuid FK -> tenants.id,
  role text, -- MASTER | TENANT_ADMIN | AGENT
  is_active boolean,
  last_login timestamp,
  created_at timestamp
)

🔹 subscriptions
subscriptions (
  id uuid PK,
  tenant_id uuid FK,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text,
  status text,
  current_period_end timestamp
)

🔹 chat_logs
chat_logs (
  id uuid PK,
  tenant_id uuid FK,
  user_id uuid FK,
  question text,
  answer text,
  tokens_used int,
  created_at timestamp
)

🔹 documents (RAG)
documents (
  id uuid PK,
  tenant_id uuid FK NULL, -- NULL = global (MASTER)
  scope text, -- global | tenant
  filename text,
  content text,
  created_at timestamp
)

🔹 invoices (faturas)
invoices (
  id uuid PK,
  tenant_id uuid FK,
  user_id uuid FK,
  source text,
  raw_file_url text,
  extracted_data jsonb,
  created_at timestamp
)

🔹 omie_calculations
omie_calculations (
  id uuid PK,
  tenant_id uuid FK,
  user_id uuid FK,
  start_date date,
  end_date date,
  average_price numeric,
  created_at timestamp
)

🔹 proposals
proposals (
  id uuid PK,
  tenant_id uuid FK,
  user_id uuid FK,
  client_name text,
  supplier text,
  input_data jsonb,
  comparison_result jsonb,
  pdf_url text,
  created_at timestamp
)

🔹 user_sessions (controlo de login único)
user_sessions (
  user_id uuid PK,
  session_id text,
  device_fingerprint text,
  updated_at timestamp
)

3️⃣ RELAÇÕES IMPORTANTES

1 tenant → N users

1 tenant → N chat_logs / invoices / proposals

documents:

tenant_id IS NULL → global (MASTER)

tenant_id = X → privado do tenant

4️⃣ RLS – POLÍTICAS (ESSÊNCIA)
🔐 Ativar RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;
-- repetir para todas

👤 Acesso base por tenant
CREATE POLICY tenant_isolation
ON chat_logs
USING (
  tenant_id = (
    SELECT tenant_id FROM users WHERE id = auth.uid()
  )
);

👑 MASTER bypass
CREATE POLICY master_access
ON chat_logs
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'MASTER'
  )
);

📚 Documents (global + tenant)
CREATE POLICY documents_access
ON documents
USING (
  scope = 'global'
  OR tenant_id = (
    SELECT tenant_id FROM users WHERE id = auth.uid()
  )
);

🛑 AGENT read-only

Exemplo:

CREATE POLICY agent_read_only
ON tenants
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('TENANT_ADMIN','MASTER')
  )
);

5️⃣ CASOS ESPECIAIS IMPORTANTES
🔑 OpenAI API Key (BYOK)

Guardada apenas no tenant

Nunca exposta no frontend

Apenas usada no backend

🔒 Login único

user_sessions guarda a sessão válida

Middleware invalida sessões antigas

RLS impede escrita cruzada

📊 Logs e métricas

chat_logs e omie_calculations são append-only

Nunca permitir UPDATE/DELETE para AGENT

6️⃣ COMO USAR ISTO NO CURSOR (INDICAÇÃO EXATA)

Quando fores para o Cursor, o prompt correto será:

Contexto:
Os schemas Supabase e RLS estão definidos conforme documentação.

Tarefa:
Implementa [FEATURE] respeitando:
- multitenancy por tenant_id
- RLS existente
- roles MASTER / TENANT_ADMIN / AGENT
