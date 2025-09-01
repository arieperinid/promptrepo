# PromptRepo - Context & MVP

## Visão Geral

PromptRepo é uma plataforma SaaS para organização e gerenciamento de prompts de IA. Permite aos usuários criar, versionar, validar e compartilhar prompts de forma estruturada.

## MVP Core Features

### 🔐 Autenticação & Perfis

- Login/registro via Supabase Auth
- Perfis de usuário (user/admin)
- Preferências de tema (light/dark/system)

### 📁 Gestão de Projetos

- Criar/editar/deletar projetos
- Projetos públicos/privados
- Organização hierárquica: Projeto → Segmento → Prompt

### ✍️ Editor de Prompts

- Editor rich text para prompts
- Variáveis dinâmicas `{{variable}}`
- Preview em tempo real
- Validadores configuráveis (regex, length, contains, custom)

### 📦 Versionamento

- Histórico completo de versões
- Changelog por versão
- Rollback para versões anteriores
- Publicação de versões estáveis

### 💰 Billing & Plans

- Plan free (limitado)
- Plan pro (recursos avançados)
- Plan enterprise (customizações)
- Integração Stripe para pagamentos

## Stack Tecnológica

### Frontend

- **Site**: Next.js 14 (App Router) - Landing page e dashboard
- **Admin**: Next.js 14 - Painel administrativo
- **UI Library**: Chakra UI (sem Tailwind)

### Backend

- **API**: Hono + Node.js
- **Database**: PostgreSQL via Supabase
- **Auth**: Supabase Auth
- **Cache**: Redis (Upstash)
- **Payments**: Stripe

### DevOps & Tools

- **Monorepo**: Turborepo + pnpm workspaces
- **Language**: TypeScript strict mode
- **Quality**: ESLint + Prettier + Husky
- **Testing**: Vitest
- **Deployment**: Vercel

## Arquitetura Monorepo

```
promptrepo/
├── apps/
│   ├── site/          # Next.js - Landing & Dashboard
│   ├── admin/         # Next.js - Admin panel
│   └── api/           # Hono API
├── packages/
│   ├── ui/            # Chakra UI components
│   ├── shared/        # Zod schemas & utilities
│   └── config/        # ESLint/TS configs
└── sql/               # Database schemas
```

## Estado Atual (Bootstrap)

✅ **Completo**

- Estrutura monorepo Turborepo
- Packages base (ui, shared, config)
- Apps skeleton (site, admin, api)
- Configurações de qualidade
- Schemas SQL definidos

🔄 **Próximas Iterações**

- P1.3: UI do dashboard (GPT-5)
- P1.4: Editor de prompts (GPT-5)
- P2.0: Autenticação Supabase
- P3.0: CRUD completo
- P4.0: Versionamento
- P4.1: Admin UI (GPT-5)
- P5.0: Billing & Stripe

## Notas Importantes

- **UI Marcada para GPT-5**: Componentes complexos serão implementados com GPT-5
- **Base Sólida**: Foco atual na infraestrutura e funcionalidades core
- **Escalabilidade**: Arquitetura preparada para crescimento
- **Qualidade**: Testes e linting desde o início
- **Tipos de Domínio**: Usam snake_case para aderir ao Postgres; conversões para camelCase, se necessárias em UI, serão feitas nos apps (P1.3 UI → GPT-5)
