"use client"

import { useEffect, useState } from "react"
import { getDashboardStats } from "@/lib/actions/analytics"
import { Clock, FileText, CalendarDays, Ticket } from "lucide-react"
import { cn } from "@/lib/utils"

type Stats = {
  hoursThisWeek: number
  reportsThisMonth: number
  pendingLeaves: number
  openTickets: number
}

const STAT_CONFIG = [
  {
    key: "hoursThisWeek" as const,
    label: "Hours This Week",
    icon: Clock,
    format: (v: number) => `${v}h`,
    color: "text-primary",
  },
  {
    key: "reportsThisMonth" as const,
    label: "Reports This Month",
    icon: FileText,
    format: (v: number) => String(v),
    color: "text-chart-2",
  },
  {
    key: "pendingLeaves" as const,
    label: "Pending Leaves",
    icon: CalendarDays,
    format: (v: number) => String(v),
    color: "text-amber-500",
  },
  {
    key: "openTickets" as const,
    label: "Open Tickets",
    icon: Ticket,
    format: (v: number) => String(v),
    color: "text-chart-4",
  },
]

export function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getDashboardStats().then(setStats)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-2">
      {STAT_CONFIG.map((stat) => (
        <div
          key={stat.key}
          className="rounded-md border border-border/60 bg-background p-2.5 space-y-1"
        >
          <div className="flex items-center gap-1.5">
            <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
            <span className="text-sm text-muted-foreground truncate">{stat.label}</span>
          </div>
          <p className="text-lg font-semibold tabular-nums">
            {stats ? stat.format(stats[stat.key]) : "—"}
          </p>
        </div>
      ))}
    </div>
  )
}
