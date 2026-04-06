"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

const DEMO_USER_ID_QUERY = () =>
  prisma.user.findFirst({ where: { email: "demo@company.com" } })

const shiftReportSchema = z.object({
  mood: z.enum(["EXCITED", "HAPPY", "NEUTRAL", "TIRED", "STRESSED"]),
  accomplishments: z.string().min(1),
  challenges: z.string().min(1),
  managementSupport: z.string().optional(),
})

export async function createShiftReport(data: z.infer<typeof shiftReportSchema>) {
  const user = await DEMO_USER_ID_QUERY()
  if (!user) throw new Error("User not found")

  const parsed = shiftReportSchema.parse(data)

  return prisma.shiftReport.create({
    data: {
      userId: user.id,
      mood: parsed.mood,
      accomplishments: parsed.accomplishments,
      challenges: parsed.challenges,
      managementSupport: parsed.managementSupport || null,
      date: new Date(),
    },
  })
}

export async function getShiftReports() {
  const user = await DEMO_USER_ID_QUERY()
  if (!user) return []

  return prisma.shiftReport.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: 20,
  })
}
