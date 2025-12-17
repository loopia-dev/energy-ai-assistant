🔰 EPIC 0 — Fundacional (Setup & Base Técnica)
Objetivo

Criar a base sólida do SaaS para evitar refactors futuros.

Entregáveis

Repositório organizado

Infra mínima funcional

Decisões técnicas fechadas

Tasks

Estrutura inicial do projeto (frontend / backend)

Configurar Supabase:

auth

tabelas base

roles (MASTER, TENANT_ADMIN, AGENT)

Definir RLS (isolamento multitenant)

Configurar environments (dev / prod)

Criar documentação base (README, ARCHITECTURE.md)

🔐 EPIC 1 — Autenticação, Tenants e Roles
Objetivo

Garantir multitenancy real e segurança desde o início.

Funcionalidades

Login / logout

Associação user → tenant

Separação total de dados

Tasks

Implementar auth Supabase

Modelos:

tenants

users

memberships

Middleware de verificação de role

Impedir acesso cruzado entre tenants

Base de UI para dashboards por role

💳 EPIC 2 — Billing & Planos (Stripe)
Objetivo

Monetização clara e enforcement real de limites.

Funcionalidades

Subscrições por tenant

Planos: Basic / Pro / Ultra

Limites por plano

Tasks

Integração Stripe (subscriptions)

Webhooks Stripe → backend

Guardar estado do plano no Supabase

Enforcement:

nº de utilizadores

acesso a features

UI de plano no dashboard ADMIN

Avisos de limite atingido

🧠 EPIC 3 — Agente IA Conversacional (Core do Produto)
Objetivo

Criar o agente IA especializado em energia (MVP real).

Funcionalidades

Chat IA

BYOK por tenant

Logs e métricas

Tasks

Definir Prompt Master Global

Estrutura RAG:

base global

base por tenant

Endpoint de chat:

recebe pergunta

injeta contexto

chama OpenAI com API key do tenant

UI Chat (Lovable já feito)

Logs:

pergunta

tokens

utilizador

Rate limit por plano

📚 EPIC 4 — Treino do Agente (MASTER + TENANT)
Objetivo

Permitir “treino” sem fine-tuning.

Funcionalidades

Upload de documentos

Conhecimento global vs privado

Reindexação controlada

Tasks

Upload de documentos (PDF/DOC)

Extração de texto

Indexação (vector store)

Associação:

global (MASTER)

tenant (ADMIN)

Integração n8n para ingestão/limpeza

UI de gestão de fontes

📄 EPIC 5 — Leitor AI de Faturas
Objetivo

Automatizar leitura e interpretação de faturas.

Funcionalidades

Upload PDF / JPEG / GIF

Extração inteligente

Correção manual

Tasks

UI de upload + preview

OCR + IA extraction

Parser de campos chave:

cliente

período

consumo

valores

Armazenamento por tenant

Logs de processamento

Reutilização dos dados no Chat e Propostas

📊 EPIC 6 — Cálculo de Tarifas Indexadas (OMIE)
Objetivo

Ferramenta técnica diferenciadora para comerciais.

Funcionalidades

Seleção de datas

Cálculo spot médio / min / max

Visualização simples

Tasks

Serviço backend para ingestão OMIE

script Python (OMIEData ou equivalente)

Cache por período

Endpoint de cálculo

UI:

input datas

tabela + gráfico simples

Limites por plano

Logs de uso

📈 EPIC 7 — Propostas Comerciais + PDF
Objetivo

Gerar propostas profissionais em minutos.

Funcionalidades

Formulário de proposta

Comparação preços atuais vs propostos

PDF profissional

Tasks

UI de formulário (dados cliente + preços)

Lógica de cálculo comparativo

Templates de PDF

Geração e download

Histórico de propostas por tenant

Integração com dados de faturas e OMIE

🔒 EPIC 8 — Controlo de Sessões & Abuso
Objetivo

Evitar partilha de contas e uso indevido.

Funcionalidades

Login único por utilizador

Invalidação de sessões antigas

Tasks

Guardar session_id / device_fingerprint

Middleware de verificação

Logout forçado em sessão duplicada

UI de aviso ao utilizador

📊 EPIC 9 — Métricas & Observabilidade
Objetivo

Visão clara do negócio e do uso.

Funcionalidades

Métricas por tenant

Métricas globais (MASTER)

Tasks

Dashboards:

perguntas

uploads

PDFs

consumo OpenAI

MRR

Tenants ativos

Alertas simples (ex: API key inválida)

🚀 EPIC 10 — Polimento & Go-to-Market
Objetivo

Preparar lançamento beta/comercial.

Tasks

QA geral

UX polishing

Copy de onboarding

Documentação de ajuda

Plano beta (early adopters)

🧠 Ordem Recomendada (realista)

EPIC 0 → 3 (produto mínimo vendável)

EPIC 4 → 5 (valor real)

EPIC 6 → 7 (diferenciação)

EPIC 8 → 10 (escala)
