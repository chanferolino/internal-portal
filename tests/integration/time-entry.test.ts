import { describe, it, expect, beforeEach, afterAll } from "vitest"
import { testPrisma, cleanDatabase, createTestUser } from "../helpers/db"

describe("Time Entry", () => {
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

  it("should clock in a user", async () => {
    const entry = await testPrisma.timeEntry.create({
      data: {
        userId,
        clockIn: new Date(),
        timezone: "Asia/Manila",
      },
    })

    expect(entry.id).toBeDefined()
    expect(entry.clockIn).toBeInstanceOf(Date)
    expect(entry.clockOut).toBeNull()
    expect(entry.userId).toBe(userId)
  })

  it("should clock out a user", async () => {
    const entry = await testPrisma.timeEntry.create({
      data: {
        userId,
        clockIn: new Date(),
        timezone: "Asia/Manila",
      },
    })

    const updated = await testPrisma.timeEntry.update({
      where: { id: entry.id },
      data: { clockOut: new Date() },
    })

    expect(updated.clockOut).toBeInstanceOf(Date)
    expect(updated.clockOut!.getTime()).toBeGreaterThanOrEqual(updated.clockIn.getTime())
  })

  it("should find active time entry (no clock out)", async () => {
    await testPrisma.timeEntry.create({
      data: {
        userId,
        clockIn: new Date(),
        timezone: "Asia/Manila",
      },
    })

    const active = await testPrisma.timeEntry.findFirst({
      where: { userId, clockOut: null },
    })

    expect(active).not.toBeNull()
    expect(active!.clockOut).toBeNull()
  })

  it("should return null when no active time entry", async () => {
    const active = await testPrisma.timeEntry.findFirst({
      where: { userId, clockOut: null },
    })

    expect(active).toBeNull()
  })
})
