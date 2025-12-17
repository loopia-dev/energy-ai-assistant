PRD – Energy Agent Suite (Micro-SaaS B2B)

1. Visão Geral
Plataforma SaaS multitenant para agentes e comerciais de energia, com agentes IA especializados, leitura de faturas,
cálculo de tarifas indexadas (OMIE) e geração de propostas comerciais em PDF.

2. Roles
- MASTER: proprietário da plataforma
- TENANT_ADMIN: administrador do cliente
- AGENT: utilizador final

3. Funcionalidades Principais
3.1 Agente IA Conversacional
- Chat especializado em energia
- BYOK (OpenAI API por tenant)
- Logs e métricas de uso

3.2 Leitor AI de Faturas
- Upload PDF, JPEG, GIF
- Extração automática de dados
- Validação manual
- Armazenamento seguro

3.3 Cálculo Tarifas Indexadas (OMIE)
- Seleção de datas
- Cálculo médio, min, max
- Dados OMIE/MIBEL
- Cache por período

3.4 Geração de Propostas + PDF
- Formulário de dados do cliente
- Comparação de preços
- PDF profissional para download

4. Planos
- Basic: 47€/mês (1 utilizador)
- Pro: 97€/mês (5 utilizadores)
- Ultra: 197€/mês (ilimitado)

5. Requisitos Técnicos
- Frontend: Lovable
- Backend: Cursor
- DB/Auth: Supabase
- Billing: Stripe
- Automations: n8n

6. Métricas
- Tenants ativos
- MRR
- Consumo OpenAI
- PDFs gerados
- Cálculos OMIE

7. Segurança
- Multitenant isolation
- Session única por utilizador
- RLS Supabase

