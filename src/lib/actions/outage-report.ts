"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

const DEMO_USER_ID_QUERY = () =>
  prisma.user.findFirst({ where: { email: "demo@company.com" } })

const outageReportSchema = z.object({
  type: z.enum(["INTERNET", "POWER"]),
  cause: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  details: z.string().optional(),
})

export async function createOutageReport(data: z.infer<typeof outageReportSchema>) {
  try {
    const user = await DEMO_USER_ID_QUERY()
    if (!user) return { error: "User not found" }

    const parsed = outageReportSchema.parse(data)

    await prisma.outageReport.create({
      data: {
        userId: user.id,
        type: parsed.type,
        cause: parsed.cause,
        address: parsed.address,
        city: parsed.city,
        startTime: new Date(`${parsed.startDate}T${parsed.startTime}`),
        endTime: parsed.endTime && parsed.startDate
          ? new Date(`${parsed.startDate}T${parsed.endTime}`)
          : null,
        startDate: new Date(parsed.startDate),
        endDate: parsed.endDate ? new Date(parsed.endDate) : null,
        details: parsed.details || null,
      },
    })
    return { success: true }
  } catch {
    return { error: "Failed to submit outage report" }
  }
}
