"use server"

import { prisma } from "@/lib/prisma"

const DEMO_USER_ID_QUERY = () =>
  prisma.user.findFirst({ where: { email: "demo@company.com" } })

export async function clockIn(timezone: string) {
  try {
    const user = await DEMO_USER_ID_QUERY()
    if (!user) return { error: "User not found" }

    const active = await prisma.timeEntry.findFirst({
      where: { userId: user.id, clockOut: null },
    })
    if (active) return { error: "Already clocked in" }

    await prisma.timeEntry.create({
      data: { userId: user.id, clockIn: new Date(), timezone },
    })
    return { success: true }
  } catch {
    return { error: "Failed to clock in" }
  }
}

export async function clockOut() {
  try {
    const user = await DEMO_USER_ID_QUERY()
    if (!user) return { error: "User not found" }

    const active = await prisma.timeEntry.findFirst({
      where: { userId: user.id, clockOut: null },
    })
    if (!active) return { error: "Not clocked in" }

    await prisma.timeEntry.update({
      where: { id: active.id },
      data: { clockOut: new Date() },
    })
    return { success: true }
  } catch {
    return { error: "Failed to clock out" }
  }
}

export async function getActiveTimeEntry() {
  const user = await DEMO_USER_ID_QUERY()
  if (!user) return null

  return prisma.timeEntry.findFirst({
    where: { userId: user.id, clockOut: null },
  })
}
