# Database Schemas

Este diretório contém os schemas SQL para o banco de dados do PromptRepo.

## Arquivos

- `01_profiles.sql` - Tabela de perfis de usuário
- `02_projects.sql` - Tabela de projetos
- `03_segments.sql` - Tabela de segmentos de projetos
- `04_prompts.sql` - Tabela de prompts
- `05_validators.sql` - Tabela de validadores de prompts
- `06_versions.sql` - Tabela de versões de prompts
- `07_billing.sql` - Tabela de informações de cobrança

## Ordem de execução

Os arquivos devem ser executados na ordem numérica (01, 02, 03, etc.) devido às dependências de foreign keys.

## Características

- **UUIDs**: Todas as primary keys usam UUID v4
- **Timestamps**: Campos `created_at` e `updated_at` com timezone
- **Triggers**: Auto-atualização de `updated_at`
- **Indexes**: Otimizados para consultas comuns
- **Constraints**: Validações de dados no nível do banco
- **JSONB**: Campos flexíveis para metadados

## Próximos passos

- RLS (Row Level Security) será implementado em iterações futuras
- Migrações automáticas serão configuradas posteriormente
- Policies de segurança serão definidas conforme necessário

## Nota

⚠️ Estes schemas ainda não foram aplicados ao banco. São apenas definições para referência futura.
