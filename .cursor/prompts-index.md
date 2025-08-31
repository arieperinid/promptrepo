# Prompts Index & Development Phases

## Legenda
- 🤖 **[Claude]** - Implementado com Claude 3.5 Sonnet
- 🚀 **[UI → GPT-5]** - UI complexa a ser implementada com GPT-5

---

## Phase 0: Bootstrap 🤖 **[Claude]** ✅

### Infraestrutura Base
- [x] Monorepo Turborepo + pnpm
- [x] TypeScript strict configuration
- [x] ESLint + Prettier + Husky setup
- [x] Vitest testing framework
- [x] Package structure (ui, shared, config)

### Apps Skeleton
- [x] Site Next.js App Router
- [x] Admin Next.js com middleware
- [x] API Hono com rotas básicas

### Schemas & Types
- [x] Zod schemas completos
- [x] SQL table definitions
- [x] Environment validation

---

## Phase 1.0: Core Setup 🤖 **[Claude]**

### Supabase Integration
- [ ] Configurar cliente Supabase
- [ ] Implementar auth helpers
- [ ] Setup RLS policies
- [ ] Migration scripts

### API Foundation
- [ ] CRUD operations básicas
- [ ] Middleware de autenticação
- [ ] Error handling robusto
- [ ] Rate limiting ativo

---

## Phase 1.3: Dashboard UI 🚀 **[UI → GPT-5]**

### Layout & Navigation
- [ ] Header com navegação
- [ ] Sidebar responsiva
- [ ] Breadcrumbs
- [ ] Theme switcher funcional

### Project Management UI
- [ ] Lista de projetos
- [ ] Formulário criar/editar projeto
- [ ] Cards de projeto
- [ ] Ações rápidas (public/private toggle)

### Basic Dashboard
- [ ] Overview stats
- [ ] Recent activity
- [ ] Quick actions
- [ ] Responsive grid layout

---

## Phase 1.4: Prompt Editor 🚀 **[UI → GPT-5]**

### Editor Interface
- [ ] Rich text editor
- [ ] Variable insertion `{{var}}`
- [ ] Syntax highlighting
- [ ] Preview pane

### Segments & Organization  
- [ ] Segment tree view
- [ ] Drag & drop reordering
- [ ] Nested structure display
- [ ] Quick navigation

### Variable Management
- [ ] Variable picker
- [ ] Type definitions
- [ ] Default values
- [ ] Validation rules

---

## Phase 2.0: Authentication 🤖 **[Claude]**

### User Management
- [ ] Registration flow
- [ ] Login/logout
- [ ] Profile management
- [ ] Password reset

### Session Handling
- [ ] JWT validation
- [ ] Refresh tokens
- [ ] Route protection
- [ ] Role-based access

---

## Phase 2.3: Prompt CRUD UI 🚀 **[UI → GPT-5]**

### Prompt List & Grid
- [ ] Filterable prompt list
- [ ] Search functionality
- [ ] Bulk operations
- [ ] Status indicators

### Prompt Forms
- [ ] Create prompt modal
- [ ] Edit prompt page
- [ ] Validation feedback
- [ ] Save states & drafts

### Content Management
- [ ] Copy/paste optimization
- [ ] Import/export prompts
- [ ] Template library
- [ ] Favorites system

---

## Phase 3.0: Advanced Features 🤖 **[Claude]**

### Validators System
- [ ] Validator engine
- [ ] Custom validator functions
- [ ] Validation results display
- [ ] Performance optimization

### Search & Filters
- [ ] Full-text search
- [ ] Advanced filtering
- [ ] Saved searches
- [ ] Search analytics

---

## Phase 3.3: Advanced UI 🚀 **[UI → GPT-5]**

### Validation UI
- [ ] Validator configuration panel
- [ ] Real-time validation feedback
- [ ] Validation results visualization
- [ ] Custom validator editor

### Search Experience
- [ ] Global search interface
- [ ] Filter panels
- [ ] Search result highlighting
- [ ] Saved search management

---

## Phase 4.0: Version Control 🤖 **[Claude]**

### Versioning Engine
- [ ] Version creation/management
- [ ] Diff generation
- [ ] Branch/merge concepts
- [ ] Rollback functionality

### Publishing System
- [ ] Publication workflow
- [ ] Approval process
- [ ] Release notes
- [ ] Distribution channels

---

## Phase 4.1: Admin Panel 🚀 **[UI → GPT-5]**

### User Management
- [ ] User list with search/filter
- [ ] Role assignment interface
- [ ] Bulk user operations
- [ ] User activity monitoring

### System Analytics
- [ ] Usage dashboards
- [ ] Performance metrics
- [ ] Error monitoring
- [ ] System health indicators

### Content Moderation
- [ ] Reported content queue
- [ ] Moderation actions
- [ ] Automated content scanning
- [ ] Community guidelines enforcement

---

## Phase 4.3: Version UI 🚀 **[UI → GPT-5]**

### Version History
- [ ] Timeline visualization
- [ ] Diff viewer
- [ ] Version comparison
- [ ] Change annotations

### Publishing Interface
- [ ] Release management UI
- [ ] Changelog editor
- [ ] Publication preview
- [ ] Distribution settings

---

## Phase 5.0: Billing & Subscription 🤖 **[Claude]**

### Stripe Integration
- [ ] Payment flow
- [ ] Subscription management
- [ ] Webhook processing
- [ ] Invoice generation

### Plan Management  
- [ ] Usage tracking
- [ ] Limit enforcement
- [ ] Upgrade prompts
- [ ] Billing alerts

---

## Phase 5.3: Billing UI 🚀 **[UI → GPT-5]**

### Subscription Dashboard
- [ ] Current plan overview
- [ ] Usage metrics display
- [ ] Billing history
- [ ] Payment method management

### Upgrade Experience
- [ ] Plan comparison table
- [ ] Upgrade wizard
- [ ] Success/confirmation flow
- [ ] Downgrade handling

---

## Development Notes

### Prompt Strategy
- **Claude**: Focus no backend, logic, APIs, data modeling
- **GPT-5**: Focus em UI/UX complexa, componentes visuais, interações

### Quality Standards
- Todos os prompts devem manter TypeScript strict
- UI components devem usar Chakra UI (sem Tailwind)
- Testes obrigatórios para funcionalidades core
- Documentação atualizada a cada fase

### Handoff Points  
- Após Phase 1.0: dados e APIs prontos para UI
- Após Phase 2.0: auth ready para interfaces
- Após Phase 4.0: versioning ready para UI
- Após Phase 5.0: billing ready para UI
