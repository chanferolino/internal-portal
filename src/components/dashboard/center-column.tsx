"use client"

import { useState } from "react"
import { ShiftReportForm } from "@/components/dashboard/shift-report-form"
import { ReportHistory } from "@/components/dashboard/report-history"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ClipboardPen, History, BarChart3 } from "lucide-react"

export function CenterColumn() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="space-y-4">
      {/* Dashboard Stats */}
      <section className="rounded-lg border border-border/60 bg-card">
        <div className="flex items-center gap-2 bg-muted rounded-t-lg px-4 py-2.5">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground/90">Overview</h2>
        </div>
        <div className="p-4">
          <StatsCards />
        </div>
      </section>

      {/* Shift Report */}
      <section className="rounded-lg border border-border/60 bg-card">
        <div className="flex items-center gap-2 bg-muted rounded-t-lg px-4 py-2.5">
          <ClipboardPen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground/90">End of Shift Report</h2>
        </div>
        <div className="p-4">
          <ShiftReportForm onSubmitted={() => setRefreshKey((k) => k + 1)} />
        </div>
      </section>

      {/* Report History */}
      <section className="rounded-lg border border-border/60 bg-card">
        <div className="flex items-center gap-2 bg-muted rounded-t-lg px-4 py-2.5">
          <History className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground/90">Report History</h2>
        </div>
        <div className="p-4">
          <ReportHistory refreshKey={refreshKey} />
        </div>
      </section>
    </div>
  )
}
