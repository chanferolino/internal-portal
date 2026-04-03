# Database Conventions

## Prisma Schema

- Use `@id @default(cuid())` for primary keys
- Use `@map("snake_case")` for column names, camelCase in Prisma models
- Use `@@map("snake_case_plural")` for table names
- Always include `createdAt` and `updatedAt` timestamps
- Use enums for fixed option sets (leave types, ticket categories, mood types, outage types)
- Use relations with explicit foreign keys

## Core Models

- **User** — synced from Google auth (name, email, avatar, timezone)
- **TimeEntry** — clock in/out records (userId, clockIn, clockOut, timezone)
- **ShiftReport** — daily reports (userId, mood, accomplishments, challenges, managementSupport, date)
- **LeaveRequest** — PTO requests (userId, startDate, endDate, leaveType, category, filingType, reason, attachments, status)
- **OutageReport** — outage filings (userId, type, cause, address, city, startTime, endTime, startDate, endDate, details)
- **Ticket** — internal tickets (userId, category, subCategory, subject, description, status, priority)

## Enums

- **Mood:** EXCITED, HAPPY, NEUTRAL, TIRED, STRESSED
- **LeaveType / Category / FilingType:** TBD — use placeholder values for now
- **OutageType:** INTERNET, POWER
- **TicketCategory:** HR, FINANCE, IT
- **TicketSubCategory:** PERIPHERALS, PERMISSIONS (for IT)
- **TicketStatus:** OPEN, IN_PROGRESS, RESOLVED, CLOSED
