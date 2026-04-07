# Internal Employee Portal

Employee-facing internal portal for daily time tracking, end-of-shift reporting, leave requests, outage reporting, and internal ticketing (HR/Finance/IT).

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript (strict)
- **Auth:** NextAuth.js v5 (Google provider)
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **State:** Zustand (UI), React Hook Form + Zod (forms)
- **Rich Text:** Tiptap
- **Testing:** Vitest + Testing Library, Playwright (E2E)
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL database

### Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Fill in DATABASE_URL, NEXTAUTH_SECRET, Google OAuth credentials

# Push schema to database
pnpm db:push

# Seed sample data
pnpm db:seed

# Start development server
pnpm dev
```

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `pnpm dev`         | Start dev server               |
| `pnpm build`       | Production build               |
| `pnpm lint`        | Run ESLint                     |
| `pnpm typecheck`   | Run TypeScript type checking   |
| `pnpm db:push`     | Push Prisma schema to database |
| `pnpm db:migrate`  | Run Prisma migrations          |
| `pnpm db:generate` | Generate Prisma client         |
| `pnpm db:studio`   | Open Prisma Studio             |
| `pnpm db:seed`     | Seed database with sample data |
| `pnpm test`        | Run Vitest tests               |
| `pnpm test:watch`  | Run Vitest in watch mode       |
| `pnpm test:e2e`    | Run Playwright E2E tests       |

## Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # Shared and feature-specific components
    ui/             # shadcn/ui components
    dashboard/      # Dashboard-specific components
    modals/         # Modal components (leave request, outage report)
  lib/              # Utilities, auth config, Prisma client
  actions/          # Server actions
prisma/             # Prisma schema, migrations, and seed
```

## Features

- **Time Tracking** -- Live clock with timezone support, clock in/out recording
- **End-of-Shift Reports** -- Daily mood check-in, accomplishments, challenges, and management support
- **Report History** -- Accordion view of past shift reports
- **Leave Requests** -- PTO filing with date ranges, categories, and file attachments
- **Outage Reporting** -- Internet/power outage reports with location and time details
- **Internal Ticketing** -- File HR, Finance, or IT tickets via floating action button
- **US Holidays** -- Static holiday list for the current year
- **About Us & FAQ** -- Company info, core values, and quick links

## Screenshot
<img width="1920" height="1274" alt="internal portal" src="https://github.com/user-attachments/assets/4726a0f7-41cf-4615-913b-27dcf3f19473" />

## Testing

```bash
# Unit + integration tests
pnpm test

# E2E tests
pnpm test:e2e
```

- Integration tests run against a real test database (no mocks)
- Component tests use Vitest + Testing Library
- E2E tests use Playwright for critical user flows
