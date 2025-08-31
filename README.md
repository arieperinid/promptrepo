# PromptRepo

Um monorepo moderno para gerenciamento de prompts com TypeScript strict, ESLint, Prettier, Husky e Vitest.

## 🏗️ Arquitetura do Monorepo

```
promptrepo/
├── apps/
│   ├── admin/          # Painel administrativo (Next.js)
│   ├── api/            # API backend (Hono)
│   └── site/           # Site público (Next.js)
├── packages/
│   ├── config/         # Configurações compartilhadas (ESLint, TSConfig, Commitlint)
│   ├── shared/         # Tipos e utilitários compartilhados
│   └── ui/             # Componentes de UI (Chakra UI)
└── sql/                # Scripts SQL para banco de dados
```

## 🚀 Stack Tecnológica

- **Build System**: Turbo (monorepo)
- **Package Manager**: pnpm
- **Framework Web**: Next.js 14
- **API Framework**: Hono
- **UI Framework**: Chakra UI
- **Language**: TypeScript (strict mode)
- **Linting**: ESLint + Prettier
- **Testing**: Vitest
- **Git Hooks**: Husky + lint-staged
- **Database**: PostgreSQL (Supabase)

## 📋 Pré-requisitos

- Node.js 18 ou superior
- pnpm 8 ou superior

## 🎯 Configuração do Projeto

### 1. Instalação de Dependências

```bash
# Instalar todas as dependências do monorepo
pnpm install
```

### 2. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` em cada app que precisa:

```bash
# Para apps/admin e apps/site
cp env.example apps/admin/.env.local
cp env.example apps/site/.env.local
```

Configure as variáveis necessárias:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔧 Scripts de Desenvolvimento

### Scripts Principais (raiz do projeto)

```bash
# Desenvolvimento: inicia todos os apps em modo watch
pnpm dev

# Build: constrói todos os packages e apps
pnpm build

# Testes: executa todos os testes
pnpm test

# Linting: verifica código com ESLint
pnpm lint

# Type Check: verifica tipos TypeScript
pnpm typecheck

# Formatação: formata código com Prettier
pnpm format

# Preparação: instala git hooks
pnpm prepare
```

### Scripts por App/Package

```bash
# Admin App (porta 3001)
cd apps/admin
pnpm dev
pnpm build
pnpm test
pnpm lint

# Site App (porta 3000)  
cd apps/site
pnpm dev
pnpm build
pnpm test
pnpm lint

# API (Node.js server)
cd apps/api
pnpm dev        # Inicia em modo watch
pnpm build      # Compila TypeScript
pnpm start      # Inicia servidor compilado
pnpm test
pnpm lint

# Packages
cd packages/ui
pnpm build      # Gera bundles CJS/ESM
pnpm test
pnpm lint

cd packages/shared
pnpm build      # Gera tipos e utilitários
pnpm test
pnpm lint
```

## 🧪 Executar Testes

```bash
# Todos os testes
pnpm test

# Testes em modo watch
pnpm test:watch

# Testes de um app específico
cd apps/admin
pnpm test:watch
```

## 🏃‍♂️ Desenvolvimento

### Iniciar Ambiente de Desenvolvimento

```bash
# Inicia todos os apps simultaneamente
pnpm dev
```

Isso iniciará:

- **Site** em http://localhost:3000
- **Admin** em http://localhost:3001  
- **API** em http://localhost:3002 (ou porta configurada)

### Estrutura de URLs

- Site público: http://localhost:3000
- Painel admin: http://localhost:3001
- API backend: http://localhost:3002

## 📦 Build de Produção

```bash
# Build completo do monorepo
pnpm build
```

Isso irá:

1. Compilar packages (`shared`, `ui`)
2. Build das aplicações (`admin`, `site`, `api`)
3. Gerar todos os artefatos de produção

## ✨ Recursos Configurados

### TypeScript Strict Mode

- Configurações rigorosas para melhor type safety
- `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- Type imports consistentes

### ESLint + Prettier

- Configurações compartilhadas entre todos os projetos
- Regras específicas para Next.js e Node.js
- Auto-fix em commit via lint-staged

### Git Hooks (Husky)

- **pre-commit**: ESLint + Prettier em arquivos staged
- **commit-msg**: Validação de mensagens de commit (conventional commits)

### Vitest

- Testes unitários configurados para cada app/package
- Suporte a React Testing Library nos apps frontend
- Coverage reports disponíveis

## 🎨 Convenções de Commit

Use conventional commits para mensagens:

```bash
feat(admin): adicionar página de usuários
fix(api): corrigir validação de email
docs(readme): atualizar instruções de setup
test(ui): adicionar testes do componente Button
chore(deps): atualizar dependências
```

Escopos válidos: `admin`, `api`, `site`, `ui`, `shared`, `config`, `monorepo`

## 🛠️ Troubleshooting

### Problemas Comuns

1. **Erro de dependências**: Limpe node_modules e reinstale
   ```bash
   rm -rf node_modules apps/*/node_modules packages/*/node_modules
   pnpm install
   ```

2. **Erro de TypeScript**: Limpe cache e rebuild
   ```bash
   pnpm typecheck
   pnpm build
   ```

3. **Erro de ESLint**: Execute auto-fix
   ```bash
   pnpm lint --fix  # (use: turbo lint -- --fix)
   ```

4. **Porta em uso**: Altere as portas nos scripts de dev de cada app

### Logs e Debug

- Turbo logs: Use `--verbose` para logs detalhados
- App específico: Execute comandos diretamente no diretório do app

## 🤝 Contribuindo

1. Clone o repositório
2. Instale dependências: `pnpm install`
3. Crie uma branch: `git checkout -b feature/nova-feature`
4. Faça suas alterações seguindo as convenções
5. Commit: `git commit -m "feat: adicionar nova feature"`
6. Push: `git push origin feature/nova-feature`
7. Abra um Pull Request

## 📄 Licença

[Adicionar informações da licença]

---

**Desenvolvido com ❤️ usando TypeScript, Next.js, Hono e Chakra UI**
