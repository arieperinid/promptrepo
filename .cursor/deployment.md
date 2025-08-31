# Deployment Guide

## Overview

PromptRepo utiliza Vercel para deploy dos apps frontend e backend, com Supabase para banco de dados e serviços auxiliares.

## Vercel Configuration

### Site App (Landing + Dashboard)
```bash
# Build settings
Build Command: cd apps/site && npm run build
Output Directory: apps/site/.next
Install Command: pnpm install
Node.js Version: 18.x
```

### Admin App (Admin Panel)  
```bash
# Build settings
Build Command: cd apps/admin && npm run build
Output Directory: apps/admin/.next
Install Command: pnpm install
Node.js Version: 18.x
```

### API App (Hono Backend)
```bash
# Build settings  
Build Command: cd apps/api && npm run build
Output Directory: apps/api/dist
Install Command: pnpm install
Node.js Version: 18.x
```

## Environment Variables

### Required for All Apps

#### Supabase
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Upstash Redis
```bash
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=AYCxASQgM2Y4...
```

#### Stripe
```bash
STRIPE_SECRET_KEY=sk_test_... # ou sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Additional (Production)
```bash
NODE_ENV=production
```

## Deployment Steps

### 1. Setup Supabase Project

1. Criar projeto no [supabase.com](https://supabase.com)
2. Aplicar schemas SQL:
   ```bash
   # No dashboard Supabase > SQL Editor
   # Execute os arquivos sql/ na ordem numérica
   ```
3. Configurar RLS policies (futuro)
4. Obter URLs e keys do dashboard

### 2. Setup Upstash Redis

1. Criar database no [upstash.com](https://upstash.com)
2. Obter REST URL e token
3. Configurar no Vercel

### 3. Setup Stripe

1. Criar conta no [stripe.com](https://stripe.com)
2. Configurar produtos e preços
3. Configurar webhooks:
   - URL: `https://api-domain.vercel.app/webhooks/stripe`
   - Events: `customer.subscription.*`, `invoice.*`
4. Obter keys do dashboard

### 4. Deploy no Vercel

#### Site App
```bash
# Connect do GitHub no Vercel
# Configure build settings:
Build Command: pnpm turbo build --filter=@promptrepo/site
Output Directory: apps/site/.next
Root Directory: /
```

#### Admin App  
```bash  
Build Command: pnpm turbo build --filter=@promptrepo/admin
Output Directory: apps/admin/.next
Root Directory: /
```

#### API App
```bash
Build Command: pnpm turbo build --filter=@promptrepo/api  
Output Directory: apps/api/dist
Root Directory: /
```

## Vercel.json Configuration

Criar na raiz do projeto:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/site/package.json",
      "use": "@vercel/next",
      "config": {
        "buildCommand": "cd ../.. && pnpm turbo build --filter=@promptrepo/site"
      }
    },
    {
      "src": "apps/admin/package.json", 
      "use": "@vercel/next",
      "config": {
        "buildCommand": "cd ../.. && pnpm turbo build --filter=@promptrepo/admin"
      }
    },
    {
      "src": "apps/api/package.json",
      "use": "@vercel/node",
      "config": {
        "buildCommand": "cd ../.. && pnpm turbo build --filter=@promptrepo/api"
      }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "apps/api/dist/index.js" },
    { "src": "/admin", "dest": "apps/admin" },
    { "src": "/admin/(.*)", "dest": "apps/admin" },
    { "src": "/(.*)", "dest": "apps/site" }
  ]
}
```

## Domain Configuration

### Produção
- **Site**: `https://promptrepo.com`  
- **Admin**: `https://admin.promptrepo.com`
- **API**: `https://api.promptrepo.com`

### Staging  
- **Site**: `https://staging.promptrepo.com`
- **Admin**: `https://admin-staging.promptrepo.com`  
- **API**: `https://api-staging.promptrepo.com`

## CORS Configuration

No apps/api/src/index.ts, configurar origins:

```typescript
app.use("*", cors({
  origin: [
    "https://promptrepo.com",
    "https://admin.promptrepo.com",
    "http://localhost:3000", // dev only
    "http://localhost:3001", // dev only
  ],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
```

## Health Checks

### API Health Check
```bash
curl https://api.promptrepo.com/health
# Response: {"ok": true}
```

### Database Connection
```bash
# No Supabase dashboard > Health Check
# Verificar status dos serviços
```

### Redis Connection  
```bash
# No Upstash dashboard > Monitoring
# Verificar latency e throughput
```

## CI/CD Pipeline

### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
```

## Monitoring & Alerts

### Vercel Analytics
- Performance monitoring automático
- Error tracking integrado
- Real user metrics

### Supabase Monitoring
- Database performance
- Query analytics  
- Error logs

### Upstash Monitoring
- Redis performance
- Connection metrics
- Usage tracking

## Rollback Strategy

### Vercel Rollback
```bash
# No dashboard Vercel > Deployments
# Click no deployment anterior > "Promote to Production"
```

### Database Migrations
```bash
# Backup antes de migrations
# Rollback via SQL se necessário
```

### Environment Rollback
```bash  
# Reverter env vars no Vercel dashboard
# Redeploy apps afetados
```

## Troubleshooting

### Build Failures
1. Verificar Node.js version (18.x)
2. Limpar cache: `pnpm store prune`
3. Verificar dependencies no package.json
4. Check build logs no Vercel

### Runtime Errors
1. Verificar environment variables
2. Check API connectivity  
3. Verificar CORS configuration
4. Monitor error logs

### Performance Issues
1. Enable Vercel Analytics
2. Monitor database queries
3. Check Redis performance
4. Optimize bundle size
