"use client"

import { ShiftReportForm } from "@/components/dashboard/shift-report-form"
import { ReportHistory } from "@/components/dashboard/report-history"
import { ClipboardPen, History } from "lucide-react"

export function CenterColumn() {
  return (
    <div className="max-w-[640px] mx-auto space-y-6">
      {/* Shift Report */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ClipboardPen className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground/90">End of Shift Report</h2>
        </div>
        <div className="rounded-lg border border-border/60 bg-card p-5">
          <ShiftReportForm />
        </div>
      </section>

      {/* Report History */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground/90">Report History</h2>
        </div>
        <div className="rounded-lg border border-border/60 bg-card p-5">
          <ReportHistory />
        </div>
      </section>
    </div>
  )
}
