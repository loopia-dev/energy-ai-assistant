PRD — Energy Index CRM (Micro-SaaS)
1. Visão Geral
Nome do Produto

Energy Index CRM (nome provisório)

Tipo

Micro-SaaS B2B para consultores de energia.

Objetivo

Permitir que consultores:

Registem clientes e CPEs

Simulem preços de energia indexados ao OMIE entre datas

Guardem histórico de simulações

Gerem follow-ups com base na data de fim de fidelização

Operem num modelo subscrição paga

A plataforma inclui um Dashboard Master (Admin) para controlo global de utilizadores, licenças e faturação.

2. Público-Alvo

Consultores independentes de energia

Agentes multi-comercializador

Pequenas equipas comerciais de energia

3. Problema a Resolver

Simulações OMIE feitas manualmente (Excel, erros, sem histórico)

Falta de CRM específico para energia

Perda de oportunidades por ausência de alertas de fim de contrato

Falta de rastreabilidade da origem dos preços

4. Escopo do Produto
Incluído (MVP)

Mini-CRM por consultor

Simulador OMIE indexado (média simples)

Histórico de simulações

Gestão de contratos e fidelizações

Subscrições via Stripe

Dashboard Master (Admin)

Fora do MVP (Roadmap)

Perfis horários reais

Custos regulados ERSE (redes, CIEG, CGS, etc.)

Comparação fixo vs indexado

Exportação PDF avançada

White-label

5. Arquitetura Técnica (Definida)

Frontend: React + TypeScript

Backend: API (Next.js ou Node.js)

Base de Dados: Supabase (PostgreSQL)

ORM: Prisma

Auth: Supabase Auth

Pagamentos: Stripe

Hospedagem: Cloud (Vercel / similar)

6. Tipos de Utilizador
6.1 Consultor (User)

Gere apenas os seus clientes e dados

Acesso condicionado ao plano ativo

6.2 Admin (Master)

Acesso global

Gestão de utilizadores

Gestão de licenças e planos

Monitorização de uso

7. Funcionalidades — Consultor
7.1 Autenticação

Registo

Login

Recuperação de password

Verificação de plano ativo via Stripe

7.2 Mini-CRM
Cliente

Campos:

Nome

NIF

Observações

Data de criação

Relacionamento:

1 Cliente → N CPEs

CPE

Campos:

Código CPE

Potência contratada (kVA)

Ciclo horário (Simples | Bi | Tri)

Comercializador atual

Data de fim de fidelização

Estado (Ativo | Em negociação | Perdido)

7.3 Simulador OMIE Indexado
Inputs

Cliente

CPE

Data início

Data fim

Consumo estimado anual (kWh)

Spread (€/MWh)

Processamento

Média simples OMIE Portugal no período

Conversão €/MWh → €

Cálculo:

Preço Final = OMIE Médio + Spread
Custo Estimado = (Consumo kWh / 1000) × Preço Final

Outputs

Preço OMIE médio

Preço final indexado

Custo estimado total

Simulação guardada em histórico

7.4 Histórico & Follow-Up

Lista de simulações por cliente/CPE

Filtros por data

Vista “Contratos a terminar em:

30 dias

60 dias

90 dias”

8. Funcionalidades — Dashboard Master (Admin)
8.1 Gestão de Utilizadores

Lista de utilizadores

Estado da conta (ativa / suspensa)

Plano associado

Data de registo

8.2 Gestão de Licenças

Planos existentes

Limites por plano (ex: nº simulações/mês)

Atribuição automática via Stripe Webhooks

8.3 Monitorização

Nº total de utilizadores

Simulações/mês

Receita MRR

Churn básico

9. Subscrições & Pagamentos (Stripe)
Planos (exemplo)

Free

Simulações limitadas

Pro

Simulações ilimitadas

Histórico completo

Agency (fase futura)

Requisitos

Stripe Checkout

Webhooks:

checkout.session.completed

invoice.payment_failed

customer.subscription.deleted

Estado do plano refletido em tempo real no Supabase.

10. Dados OMIE
Fonte

Dados públicos OMIE (Portugal – Mercado Diário)

Armazenamento

Tabela dedicada com:

Data

Período

Preço €/MWh

Fonte

Timestamp de ingestão

Nota

A ingestão automática será implementada via cron job (ver documento técnico próprio).

11. Requisitos Não Funcionais

Tempo de simulação < 2 segundos

Multi-tenant seguro

Dados auditáveis

Escalável para centenas de consultores

Interface simples e objetiva

12. Critérios de Sucesso

Consultor consegue:

Criar cliente

Criar CPE

Fazer simulação

Guardar histórico

Saber quando contactar o cliente

Admin consegue:

Ver utilizadores

Ver planos

Controlar acessos

13. Estado do Documento

Versão: 1.0

Estado: Aprovado para desenvolvimento

Próximo passo: Schema Prisma + Épicos técnicos