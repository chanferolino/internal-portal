import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Seed a demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@company.com" },
    update: {},
    create: {
      name: "Demo Employee",
      email: "demo@company.com",
      image: null,
      timezone: "Asia/Manila",
    },
  })

  console.log(`Seeded user: ${user.name} (${user.email})`)

  // Seed time entries
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  await prisma.timeEntry.createMany({
    data: [
      {
        userId: user.id,
        clockIn: new Date(yesterday.setHours(9, 0, 0, 0)),
        clockOut: new Date(yesterday.setHours(18, 0, 0, 0)),
        timezone: "Asia/Manila",
      },
    ],
    skipDuplicates: true,
  })

  console.log("Seeded time entries")

  // Seed shift reports
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  await prisma.shiftReport.createMany({
    data: [
      {
        userId: user.id,
        mood: "HAPPY",
        accomplishments:
          "<ul><li>Completed the dashboard layout</li><li>Fixed 3 bugs in the time tracking module</li></ul>",
        challenges:
          "<ul><li>Struggled with timezone edge cases</li><li>Next step: write unit tests</li></ul>",
        managementSupport: null,
        date: yesterday,
      },
      {
        userId: user.id,
        mood: "NEUTRAL",
        accomplishments:
          "<ul><li>Set up project scaffolding</li><li>Configured Prisma schema and auth</li></ul>",
        challenges:
          "<ul><li>Prisma 7 migration required adapter changes</li><li>Resolved by reading docs</li></ul>",
        managementSupport: "Would appreciate access to the design Figma file.",
        date: twoDaysAgo,
      },
    ],
    skipDuplicates: true,
  })

  console.log("Seeded shift reports")

  // Seed a leave request
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)
  const nextWeekEnd = new Date(nextWeek)
  nextWeekEnd.setDate(nextWeekEnd.getDate() + 2)

  await prisma.leaveRequest.createMany({
    data: [
      {
        userId: user.id,
        startDate: nextWeek,
        endDate: nextWeekEnd,
        leaveType: "VACATION",
        category: "PLANNED",
        filingType: "FULL_DAY",
        reason: "Family vacation",
        status: "PENDING",
      },
    ],
    skipDuplicates: true,
  })

  console.log("Seeded leave requests")

  // Seed a ticket
  await prisma.ticket.createMany({
    data: [
      {
        userId: user.id,
        category: "IT",
        subCategory: "PERIPHERALS",
        subject: "Keyboard not working",
        description: "My wireless keyboard stopped connecting after the latest update.",
        status: "OPEN",
        priority: "MEDIUM",
      },
    ],
    skipDuplicates: true,
  })

  console.log("Seeded tickets")
  console.log("Seeding complete!")
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
