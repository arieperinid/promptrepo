# Architecture Overview

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Site (3000)   │    │  Admin (3001)   │    │   API (8000)    │
│   Next.js       │    │   Next.js       │    │   Hono/Node     │
│                 │    │                 │    │                 │
│ • Landing Page  │    │ • Admin Panel   │    │ • REST API      │
│ • Dashboard     │    │ • User Mgmt     │    │ • Auth Guards   │
│ • Prompt Editor │    │ • Analytics     │    │ • Rate Limiting │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Shared Libs   │
                    │                 │
                    │ • UI Components │
                    │ • Zod Schemas   │
                    │ • Utilities     │
                    └─────────────────┘
```

## Database Schema (PostgreSQL)

```
profiles (users)
├── id (uuid)
├── email
├── name  
├── role (user|admin)
└── theme_preference

projects
├── id (uuid)
├── name
├── user_id → profiles(id)
└── is_public

segments  
├── id (uuid)
├── project_id → projects(id)
├── name
└── order

prompts
├── id (uuid) 
├── segment_id → segments(id)
├── content
├── variables (jsonb)
└── order

validators
├── id (uuid)
├── prompt_id → prompts(id)
├── type (regex|length|contains|custom)
└── config (jsonb)

versions
├── id (uuid)
├── prompt_id → prompts(id) 
├── version
├── content
└── is_published

billing
├── id (uuid)
├── user_id → profiles(id)
├── stripe_customer_id
├── plan (free|pro|enterprise)
└── status
```

## Data Flow

### 1. User Registration/Login
```
Site → Supabase Auth → Profile Created → Billing Record
```

### 2. Project Management
```
Dashboard → API → Database → Real-time Updates
```

### 3. Prompt Creation
```
Editor → Validation → API → Database → Version History
```

### 4. Billing Flow  
```
Stripe Checkout → Webhook → API → Database → Plan Update
```

## External Services

### Supabase
- **Auth**: User authentication and sessions
- **Database**: PostgreSQL with Row Level Security
- **Storage**: File uploads (future)

### Upstash Redis
- **Caching**: API response caching
- **Rate Limiting**: Request throttling
- **Sessions**: Temporary data storage

### Stripe
- **Payments**: Subscription management
- **Webhooks**: Payment event handling
- **Customer Portal**: Self-service billing

## Security Layers

### 1. Authentication
```
Supabase JWT → API Middleware → Route Protection
```

### 2. Authorization  
```
User Role → Resource Access → Database RLS
```

### 3. Validation
```
Client Zod → API Zod → Database Constraints
```

### 4. Rate Limiting
```
Redis Counter → Request Throttling → Error Response
```

## Deployment Architecture

### Vercel (Frontend)
```
┌─────────────┐    ┌─────────────┐
│ Site Deploy │    │Admin Deploy │
│   (main)    │    │   (main)    │
└─────────────┘    └─────────────┘
```

### Railway/Render (Backend)
```
┌─────────────┐    ┌─────────────┐
│ API Deploy  │    │ PostgreSQL  │
│  (Docker)   │    │ (Supabase)  │
└─────────────┘    └─────────────┘
```

## Package Dependencies

```
apps/site
├── @promptrepo/ui
├── @promptrepo/shared
└── @promptrepo/config

apps/admin  
├── @promptrepo/ui
├── @promptrepo/shared
└── @promptrepo/config

apps/api
├── @promptrepo/shared
└── @promptrepo/config

packages/ui
├── @chakra-ui/react
└── @emotion/*

packages/shared
└── zod

packages/config
├── eslint
├── typescript
└── prettier
```

## Performance Considerations

### Frontend
- Static generation for landing pages
- Dynamic imports for dashboard
- Chakra UI optimization
- Image optimization

### Backend  
- Redis caching for frequent queries
- Connection pooling
- Query optimization
- Rate limiting

### Database
- Proper indexing strategy
- Query optimization
- Row Level Security
- Connection limits

## Monitoring & Observability

### Logs
- Structured logging with timestamps
- Error tracking and alerts  
- Performance monitoring

### Metrics
- API response times
- Database query performance
- User engagement tracking
- Error rates and patterns
