import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../src/generated/prisma/client"

const TEST_DATABASE_URL = "postgresql://postgres@localhost:5432/internal_portal_test"

const adapter = new PrismaPg({ connectionString: TEST_DATABASE_URL })
export const testPrisma = new PrismaClient({ adapter })

export async function cleanDatabase() {
  await testPrisma.ticket.deleteMany()
  await testPrisma.outageReport.deleteMany()
  await testPrisma.leaveRequest.deleteMany()
  await testPrisma.shiftReport.deleteMany()
  await testPrisma.timeEntry.deleteMany()
  await testPrisma.session.deleteMany()
  await testPrisma.account.deleteMany()
  await testPrisma.user.deleteMany()
}

export async function createTestUser() {
  return testPrisma.user.create({
    data: {
      name: "Test User",
      email: "test@company.com",
      timezone: "Asia/Manila",
    },
  })
}
