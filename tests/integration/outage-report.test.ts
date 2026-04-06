import { describe, it, expect, beforeEach, afterAll } from "vitest"
import { testPrisma, cleanDatabase, createTestUser } from "../helpers/db"

describe("Outage Report", () => {
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

  it("should create an internet outage report", async () => {
    const report = await testPrisma.outageReport.create({
      data: {
        userId,
        type: "INTERNET",
        cause: "ISP maintenance",
        address: "123 Main St",
        city: "Manila",
        startTime: new Date("2025-04-03T09:00:00"),
        startDate: new Date("2025-04-03"),
        details: "Internet went down during work hours",
      },
    })

    expect(report.id).toBeDefined()
    expect(report.type).toBe("INTERNET")
    expect(report.endTime).toBeNull()
  })

  it("should create a power outage report with end time", async () => {
    const report = await testPrisma.outageReport.create({
      data: {
        userId,
        type: "POWER",
        cause: "Transformer issue",
        address: "456 Oak Ave",
        city: "Cebu",
        startTime: new Date("2025-04-03T14:00:00"),
        endTime: new Date("2025-04-03T16:00:00"),
        startDate: new Date("2025-04-03"),
        endDate: new Date("2025-04-03"),
        details: null,
      },
    })

    expect(report.type).toBe("POWER")
    expect(report.endTime).toBeInstanceOf(Date)
  })

  it("should only allow INTERNET and POWER types", async () => {
    await expect(
      testPrisma.outageReport.create({
        data: {
          userId,
          type: "WATER" as never,
          cause: "Pipe burst",
          address: "789 Elm St",
          city: "Davao",
          startTime: new Date(),
          startDate: new Date(),
        },
      })
    ).rejects.toThrow()
  })
})
