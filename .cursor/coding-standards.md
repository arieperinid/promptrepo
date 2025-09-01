# PromptRepo - Coding Standards

## TypeScript

### Strict Mode
- Sempre usar TypeScript strict mode
- Configurações rigorosas em todos os `tsconfig.json`
- Tipos explícitos quando necessário para clareza

### Naming Conventions
- **Domain Types**: snake_case (alinhado com PostgreSQL)
- **Functions/Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase
- **Enums**: PascalCase com valores snake_case

### Type Safety
- Preferir `unknown` sobre `any`
- Usar type guards para narrowing
- Evitar `as` casting quando possível
- Usar `Readonly` para imutabilidade

## Zod Validation

### Schema Design
- Usar `.strict()` em todos os schemas de objeto
- Validação em todas as bordas (API inputs, database outputs)
- Schemas separados para Create/Update DTOs
- Coerção de tipos quando apropriado (`z.coerce.date()`)

### Error Handling
- Result types para operações que podem falhar
- Structured errors com códigos e i18n keys
- Evitar throwing exceptions em favor de Result<T, E>

## Code Organization

### File Structure
```
src/
├── enums/          # Constantes tipadas
├── schemas/        # Zod schemas
├── dtos/           # Data Transfer Objects
├── mappers/        # Conversões entre camadas
├── types/          # Tipos auxiliares
└── utils/          # Utilitários puros
```

### Imports
- Imports organizados por grupos (external, internal, relative)
- Barrel exports para facilitar consumo
- Evitar imports circulares

## Database Integration

### Schema Alignment
- Tipos de domínio espelham estrutura do banco (snake_case)
- Mappers para conversão DB ↔ Domain
- Validação com Zod em todas as operações

### Migrations
- SQL versionado e numerado
- Rollback strategies consideradas
- Documentação de breaking changes

## Testing

### Coverage
- Testes unitários para todas as funções puras
- Testes de integração para mappers
- Casos de sucesso e erro cobertos

### Test Structure
- Arrange, Act, Assert pattern
- Descriptive test names
- Isolated test cases (no shared state)

## Error Handling

### Structured Errors
```typescript
interface AppError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
  i18nKey?: string;
}
```

### Result Pattern
```typescript
type Result<T, E = Error> = 
  | { ok: true; value: T }
  | { ok: false; error: E };
```

## Internationalization

### Keys Structure
- Dot notation: `section.subsection.key`
- Consistent structure across locales
- Type-safe translation keys

### Default Behavior
- English as default locale
- Fallback to key if translation missing
- Support for locale detection

## Performance

### Bundle Size
- Tree-shaking friendly exports
- Lazy loading where appropriate
- External dependencies marked correctly

### Runtime
- Immutable data structures
- Pure functions preferred
- Minimal side effects

## Security

### Input Validation
- All external inputs validated with Zod
- SQL injection prevention via parameterized queries
- XSS prevention in UI components

### Error Information
- Sanitized error messages for client
- Detailed logging server-side only
- No sensitive data in error responses
