"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

const DEMO_USER_ID_QUERY = () =>
  prisma.user.findFirst({ where: { email: "demo@company.com" } })

const ticketSchema = z.object({
  category: z.enum(["HR", "FINANCE", "IT"]),
  subCategory: z.enum(["PERIPHERALS", "PERMISSIONS"]).optional(),
  subject: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
})

export async function createTicket(data: z.infer<typeof ticketSchema>) {
  const user = await DEMO_USER_ID_QUERY()
  if (!user) throw new Error("User not found")

  const parsed = ticketSchema.parse(data)

  return prisma.ticket.create({
    data: {
      userId: user.id,
      category: parsed.category,
      subCategory: parsed.subCategory || null,
      subject: parsed.subject,
      description: parsed.description,
      priority: parsed.priority,
    },
  })
}
