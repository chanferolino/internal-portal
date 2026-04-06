import { describe, it, expect, beforeEach, afterAll } from "vitest"
import { testPrisma, cleanDatabase, createTestUser } from "../helpers/db"

describe("Shift Report", () => {
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

  it("should create a shift report", async () => {
    const report = await testPrisma.shiftReport.create({
      data: {
        userId,
        mood: "HAPPY",
        accomplishments: "<ul><li>Finished dashboard</li></ul>",
        challenges: "<ul><li>Timezone bugs</li></ul>",
        managementSupport: null,
        date: new Date(),
      },
    })

    expect(report.id).toBeDefined()
    expect(report.mood).toBe("HAPPY")
    expect(report.accomplishments).toContain("Finished dashboard")
  })

  it("should create a shift report with management support", async () => {
    const report = await testPrisma.shiftReport.create({
      data: {
        userId,
        mood: "STRESSED",
        accomplishments: "<p>Fixed critical bug</p>",
        challenges: "<p>Tight deadline</p>",
        managementSupport: "Need more time for testing",
        date: new Date(),
      },
    })

    expect(report.managementSupport).toBe("Need more time for testing")
  })

  it("should list reports ordered by date descending", async () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    await testPrisma.shiftReport.createMany({
      data: [
        {
          userId,
          mood: "NEUTRAL",
          accomplishments: "Day 1",
          challenges: "Day 1 challenges",
          date: yesterday,
        },
        {
          userId,
          mood: "EXCITED",
          accomplishments: "Day 2",
          challenges: "Day 2 challenges",
          date: new Date(),
        },
      ],
    })

    const reports = await testPrisma.shiftReport.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    })

    expect(reports).toHaveLength(2)
    expect(reports[0].mood).toBe("EXCITED")
    expect(reports[1].mood).toBe("NEUTRAL")
  })

  it("should enforce valid mood enum values", async () => {
    await expect(
      testPrisma.shiftReport.create({
        data: {
          userId,
          mood: "INVALID_MOOD" as never,
          accomplishments: "test",
          challenges: "test",
          date: new Date(),
        },
      })
    ).rejects.toThrow()
  })
})
