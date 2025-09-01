# PromptRepo Testing Guide

Este documento descreve como executar os diferentes tipos de testes no PromptRepo.

## Testes Unitários e de Integração

### Executar todos os testes
```bash
pnpm -w test
```

### Executar testes em modo watch
```bash
pnpm -w test:watch
```

### Executar testes por pacote
```bash
# Testes do shared
cd packages/shared && pnpm test

# Testes da UI
cd packages/ui && pnpm test

# Testes da API
cd apps/api && pnpm test
```

## Validação P1 (RLS & Triggers)

### Visão Geral

A validação P1 testa automaticamente as políticas de Row Level Security (RLS) e os triggers de versionamento implementados no banco de dados Supabase.

### Pré-requisitos

1. **Banco de dados configurado**: O schema deve estar aplicado no Supabase
2. **Variável de ambiente**: `SUPABASE_DB_URL` deve estar configurada
3. **Dependências instaladas**: `pnpm install` no root

### Configuração da Variável de Ambiente

#### Para desenvolvimento local (Supabase CLI)
```bash
export SUPABASE_DB_URL="postgresql://postgres:postgres@localhost:54322/postgres"
```

#### Para Supabase remoto
```bash
export SUPABASE_DB_URL="postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST]:5432/postgres"
```

**⚠️ Importante**: Nunca execute estes testes em produção! Use apenas em ambientes de desenvolvimento ou teste.

### Executar Validação

```bash
# No diretório root do projeto
pnpm dbtest
```

### Estrutura dos Testes

Os testes são executados em sequência e validam:

#### 1. `10_setup_test_users.sql`
- **Objetivo**: Criar fixtures de teste
- **Ações**:
  - Limpa dados de testes anteriores
  - Cria 2 perfis de teste (owner e other)
  - Cria projetos (1 privado, 1 público)
  - Cria hierarquia completa (segments → prompts → validators)

#### 2. `11_rls_access_matrix.sql`
- **Objetivo**: Validar políticas RLS
- **Cenários testados**:
  - **Owner**: Deve ver todos os seus recursos (privados + públicos)
  - **Non-owner**: Deve ver apenas recursos públicos
  - **Anonymous**: Deve ver apenas recursos públicos
  - **Hierarquia**: Segments/prompts/validators seguem visibilidade do projeto
  - **Updates**: Apenas owners podem modificar seus recursos

#### 3. `12_triggers_versions.sql`
- **Objetivo**: Validar triggers de versionamento
- **Testes**:
  - Updates em projects/segments/prompts/validators criam versões
  - Deletes criam versões com snapshot do estado anterior
  - `entity_type` e `entity_id` são preenchidos corretamente
  - `author_id` captura o usuário autenticado
  - Snapshots contêm dados válidos em JSON

#### 4. `13_profiles_policies.sql`
- **Objetivo**: Validar políticas de perfis
- **Testes**:
  - Usuários veem apenas seu próprio perfil
  - Usuários podem atualizar apenas seu próprio perfil
  - Anonymous não tem acesso a perfis
  - Criação de perfil funciona para o próprio usuário

### Interpretação dos Resultados

#### ✅ Sucesso
```
✅ [OK] 10_setup_test_users.sql (150ms)
✅ [OK] 11_rls_access_matrix.sql (300ms)
✅ [OK] 12_triggers_versions.sql (200ms)
✅ [OK] 13_profiles_policies.sql (180ms)

🎉 All tests passed!
✅ P1-validate: PASS
```

#### ❌ Falha
```
❌ [FAIL] 11_rls_access_matrix.sql (250ms)
   Failed assertions:
   • B1_NONOWNER_PROJECTS: {"test_case":"B1_NONOWNER_PROJECTS","actual_count":2,"expected_count":1,"result":"FAIL"}

❌ Some tests failed
❌ P1-validate: FAIL
```

### Solução de Problemas

#### Erro de Conexão
```
❌ Database connection failed: connection refused
```
**Solução**: Verifique se o Supabase está rodando e a `SUPABASE_DB_URL` está correta.

#### Schema não encontrado
```
❌ relation "projects" does not exist
```
**Solução**: Execute `pnpm db:push` na pasta `apps/api` para aplicar o schema.

#### RLS Policies falhando
```
❌ Failed assertions: B1_NONOWNER_PROJECTS: expected 1, got 2
```
**Solução**: 
1. Verifique se as políticas RLS estão habilitadas: `ALTER TABLE projects ENABLE ROW LEVEL SECURITY;`
2. Confirme se as policies foram criadas corretamente
3. Teste manualmente com `set_config('request.jwt.claims', '{"sub":"uuid"}', true)`

#### Triggers não funcionando
```
❌ Failed assertions: T1_PROJECT_UPDATE_VERSION: expected 1, got 0
```
**Solução**:
1. Verifique se os triggers foram criados: `\dt` no psql
2. Confirme se a função `log_version_snapshot()` existe
3. Teste manualmente fazendo um UPDATE e verificando a tabela `versions`

### Executar Testes Individuais

Para debugar um teste específico, você pode executá-lo diretamente no psql:

```bash
# Conectar ao banco
psql "$SUPABASE_DB_URL"

# Executar um arquivo específico
\i apps/api/src/sql/tests/11_rls_access_matrix.sql
```

### Limpeza de Dados de Teste

Os testes fazem limpeza automática, mas se necessário, você pode limpar manualmente:

```sql
-- Limpar dados de teste
DELETE FROM versions WHERE author_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
DELETE FROM validators WHERE prompt_id IN (SELECT id FROM prompts WHERE segment_id IN (SELECT id FROM segments WHERE project_id IN (SELECT id FROM projects WHERE owner_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'))));
-- ... (continue a hierarquia)
DELETE FROM profiles WHERE id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
```

## Outros Testes

### Validação do Bootstrap
```bash
pnpm validate
```

### Linting
```bash
pnpm -w lint
```

### Type Checking
```bash
pnpm -w typecheck
```

### Build
```bash
pnpm -w build
```

## CI/CD

Os testes são executados automaticamente no GitHub Actions em:
- Push para `main`, `develop`, `feature/*`
- Pull Requests

O pipeline inclui:
- Instalação de dependências
- Linting
- Type checking
- Testes unitários
- Build

**Nota**: Os testes de banco (P1 validation) não são executados no CI por questões de segurança e complexidade de setup. Eles devem ser executados localmente durante o desenvolvimento.
