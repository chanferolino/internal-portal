"use server"

import { prisma } from "@/lib/prisma"

// TODO: Replace with real auth user ID
const DEMO_USER_ID_QUERY = () =>
  prisma.user.findFirst({ where: { email: "demo@company.com" } })

export async function clockIn(timezone: string) {
  const user = await DEMO_USER_ID_QUERY()
  if (!user) throw new Error("User not found")

  // Check if already clocked in
  const active = await prisma.timeEntry.findFirst({
    where: { userId: user.id, clockOut: null },
  })
  if (active) throw new Error("Already clocked in")

  return prisma.timeEntry.create({
    data: {
      userId: user.id,
      clockIn: new Date(),
      timezone,
    },
  })
}

export async function clockOut() {
  const user = await DEMO_USER_ID_QUERY()
  if (!user) throw new Error("User not found")

  const active = await prisma.timeEntry.findFirst({
    where: { userId: user.id, clockOut: null },
  })
  if (!active) throw new Error("Not clocked in")

  return prisma.timeEntry.update({
    where: { id: active.id },
    data: { clockOut: new Date() },
  })
}

export async function getActiveTimeEntry() {
  const user = await DEMO_USER_ID_QUERY()
  if (!user) return null

  return prisma.timeEntry.findFirst({
    where: { userId: user.id, clockOut: null },
  })
}
