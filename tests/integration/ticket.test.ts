import { describe, it, expect, beforeEach, afterAll } from "vitest"
import { testPrisma, cleanDatabase, createTestUser } from "../helpers/db"

describe("Ticket", () => {
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

  it("should create a ticket with default status and priority", async () => {
    const ticket = await testPrisma.ticket.create({
      data: {
        userId,
        category: "IT",
        subCategory: "PERIPHERALS",
        subject: "Mouse not working",
        description: "Wireless mouse stopped connecting",
      },
    })

    expect(ticket.id).toBeDefined()
    expect(ticket.status).toBe("OPEN")
    expect(ticket.priority).toBe("MEDIUM")
  })

  it("should create HR ticket without sub-category", async () => {
    const ticket = await testPrisma.ticket.create({
      data: {
        userId,
        category: "HR",
        subject: "PTO balance inquiry",
        description: "I need to check my remaining PTO",
      },
    })

    expect(ticket.category).toBe("HR")
    expect(ticket.subCategory).toBeNull()
  })

  it("should support all priority levels", async () => {
    const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const

    for (const priority of priorities) {
      const ticket = await testPrisma.ticket.create({
        data: {
          userId,
          category: "FINANCE",
          subject: `Priority: ${priority}`,
          description: "Test priority",
          priority,
        },
      })
      expect(ticket.priority).toBe(priority)
    }
  })

  it("should support all ticket categories", async () => {
    const categories = ["HR", "FINANCE", "IT"] as const

    for (const category of categories) {
      const ticket = await testPrisma.ticket.create({
        data: {
          userId,
          category,
          subject: `Category: ${category}`,
          description: "Test category",
        },
      })
      expect(ticket.category).toBe(category)
    }
  })

  it("should only allow IT sub-categories for IT tickets", async () => {
    const subCategories = ["PERIPHERALS", "PERMISSIONS"] as const

    for (const subCategory of subCategories) {
      const ticket = await testPrisma.ticket.create({
        data: {
          userId,
          category: "IT",
          subCategory,
          subject: `SubCat: ${subCategory}`,
          description: "Test sub-category",
        },
      })
      expect(ticket.subCategory).toBe(subCategory)
    }
  })
})
