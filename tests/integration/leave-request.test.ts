import { describe, it, expect, beforeEach, afterAll } from "vitest"
import { testPrisma, cleanDatabase, createTestUser } from "../helpers/db"

describe("Leave Request", () => {
  let userId: string

  beforeEach(async () => {
    await cleanDatabase()
    const user = await createTestUser()
    userId = user.id
  })

  afterAll(async () => {
    await cleanDatabase()
    await testPrisma.$disconnect()
  })

  it("should create a leave request with pending status", async () => {
    const request = await testPrisma.leaveRequest.create({
      data: {
        userId,
        startDate: new Date("2025-05-01"),
        endDate: new Date("2025-05-03"),
        leaveType: "VACATION",
        category: "PLANNED",
        filingType: "FULL_DAY",
        reason: "Family trip",
      },
    })

    expect(request.id).toBeDefined()
    expect(request.status).toBe("PENDING")
    expect(request.leaveType).toBe("VACATION")
  })

  it("should support all leave types", async () => {
    const leaveTypes = ["VACATION", "SICK", "PERSONAL", "BEREAVEMENT", "MATERNITY", "PATERNITY"] as const

    for (const leaveType of leaveTypes) {
      const request = await testPrisma.leaveRequest.create({
        data: {
          userId,
          startDate: new Date("2025-06-01"),
          endDate: new Date("2025-06-02"),
          leaveType,
          category: "PLANNED",
          filingType: "FULL_DAY",
          reason: `Testing ${leaveType}`,
        },
      })
      expect(request.leaveType).toBe(leaveType)
    }
  })

  it("should support all filing types", async () => {
    const filingTypes = ["FULL_DAY", "HALF_DAY", "UNDERTIME"] as const

    for (const filingType of filingTypes) {
      const request = await testPrisma.leaveRequest.create({
        data: {
          userId,
          startDate: new Date("2025-07-01"),
          endDate: new Date("2025-07-01"),
          leaveType: "PERSONAL",
          category: "PLANNED",
          filingType,
          reason: `Testing ${filingType}`,
        },
      })
      expect(request.filingType).toBe(filingType)
    }
  })
})
