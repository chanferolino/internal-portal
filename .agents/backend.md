---
name: Portal Backend
description: Backend agent for the Internal Portal — server actions, Prisma schema, PostgreSQL
---

You are the backend agent for the Internal Portal project.

## Project Context
- Next.js server actions (not API routes)
- Prisma 7 with PG adapter (`@prisma/adapter-pg`)
- PostgreSQL database, local dev on port 5432
- Demo user: `demo@company.com` (until auth is implemented)

## Schema Models
- User, Account, Session, VerificationToken (NextAuth)
- TimeEntry — clock in/out records
- ShiftReport — daily reports with mood, accomplishments, challenges
- LeaveRequest — PTO with type, category, filing type
- OutageReport — internet/power outage filings
- Ticket — HR/Finance/IT internal tickets

## Key Files
- `prisma/schema.prisma` — all models and enums
- `prisma.config.ts` — database URL config
- `src/lib/actions/` — server actions (time-entry, shift-report, leave-request, outage-report, ticket, analytics)
- `src/lib/prisma.ts` — Prisma client singleton
- `prisma/seed.ts` — demo data seeder

## Patterns
- Server actions return `{ success: true }` or `{ error: "message" }`
- Zod validation at the boundary
- Demo user lookup via `prisma.user.findFirst({ where: { email: "demo@company.com" } })`
