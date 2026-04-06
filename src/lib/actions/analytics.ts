"use server"

import { prisma } from "@/lib/prisma"

const DEMO_USER_ID_QUERY = () =>
  prisma.user.findFirst({ where: { email: "demo@company.com" } })

export async function getDashboardStats() {
  const user = await DEMO_USER_ID_QUERY()
  if (!user) return null

  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    hoursThisWeek,
    reportsThisMonth,
    pendingLeaves,
    openTickets,
  ] = await Promise.all([
    // Hours worked this week
    prisma.timeEntry.findMany({
      where: {
        userId: user.id,
        clockIn: { gte: startOfWeek },
        clockOut: { not: null },
      },
    }).then((entries) =>
      entries.reduce((total, entry) => {
        if (!entry.clockOut) return total
        return total + (entry.clockOut.getTime() - entry.clockIn.getTime()) / (1000 * 60 * 60)
      }, 0)
    ),

    // Reports submitted this month
    prisma.shiftReport.count({
      where: {
        userId: user.id,
        date: { gte: startOfMonth },
      },
    }),

    // Pending leave requests
    prisma.leaveRequest.count({
      where: {
        userId: user.id,
        status: "PENDING",
      },
    }),

    // Open tickets
    prisma.ticket.count({
      where: {
        userId: user.id,
        status: { in: ["OPEN", "IN_PROGRESS"] },
      },
    }),
  ])

  return {
    hoursThisWeek: Math.round(hoursThisWeek * 10) / 10,
    reportsThisMonth,
    pendingLeaves,
    openTickets,
  }
}
