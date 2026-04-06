"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

const DEMO_USER_ID_QUERY = () =>
  prisma.user.findFirst({ where: { email: "demo@company.com" } })

const leaveRequestSchema = z.object({
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  leaveType: z.enum(["VACATION", "SICK", "PERSONAL", "BEREAVEMENT", "MATERNITY", "PATERNITY"]),
  category: z.enum(["PLANNED", "UNPLANNED", "EMERGENCY"]),
  filingType: z.enum(["FULL_DAY", "HALF_DAY", "UNDERTIME"]),
  reason: z.string().min(1),
})

export async function createLeaveRequest(data: z.infer<typeof leaveRequestSchema>) {
  try {
    const user = await DEMO_USER_ID_QUERY()
    if (!user) return { error: "User not found" }

    const parsed = leaveRequestSchema.parse(data)

    await prisma.leaveRequest.create({
      data: {
        userId: user.id,
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
        leaveType: parsed.leaveType,
        category: parsed.category,
        filingType: parsed.filingType,
        reason: parsed.reason,
      },
    })
    return { success: true }
  } catch {
    return { error: "Failed to submit leave request" }
  }
}
