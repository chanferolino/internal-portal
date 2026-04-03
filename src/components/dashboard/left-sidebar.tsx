"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock } from "@/components/dashboard/clock"
import { TimezoneSelector } from "@/components/dashboard/timezone-selector"
import { TimeTrackingButton } from "@/components/dashboard/time-tracking-button"
import { LeaveRequestModal } from "@/components/modals/leave-request-modal"
import { OutageReportModal } from "@/components/modals/outage-report-modal"
import { Zap, CalendarDays } from "lucide-react"

export function LeftSidebar() {
  const [timezone, setTimezone] = useState("Asia/Manila")
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [outageModalOpen, setOutageModalOpen] = useState(false)

  function handleToggleClock() {
    setIsClockedIn((prev) => !prev)
    // TODO: API call to create/update TimeEntry
  }

  return (
    <div className="space-y-4">
      {/* Clock section */}
      <div className="rounded-lg border border-border/60 bg-background p-4">
        <Clock timezone={timezone} />
      </div>

      <TimezoneSelector value={timezone} onChange={(val) => val && setTimezone(val)} />
      <TimeTrackingButton isClockedIn={isClockedIn} onToggle={handleToggleClock} />

      {/* Action buttons */}
      <div className="pt-2">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em] mb-2.5 px-0.5">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-auto py-3 flex-col gap-1 border-border/60 bg-background hover:bg-accent hover:border-border text-xs font-medium"
            onClick={() => setOutageModalOpen(true)}
          >
            <Zap className="h-4 w-4 text-amber-400" />
            Report Outage
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex-col gap-1 border-border/60 bg-background hover:bg-accent hover:border-border text-xs font-medium"
            onClick={() => setLeaveModalOpen(true)}
          >
            <CalendarDays className="h-4 w-4 text-chart-2" />
            Leave Request
          </Button>
        </div>
      </div>

      <LeaveRequestModal open={leaveModalOpen} onOpenChange={setLeaveModalOpen} />
      <OutageReportModal open={outageModalOpen} onOpenChange={setOutageModalOpen} />
    </div>
  )
}
