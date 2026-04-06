"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { ClockTime, ClockDate } from "@/components/dashboard/clock"
import { TimeTrackingButton } from "@/components/dashboard/time-tracking-button"
import { LeaveRequestModal } from "@/components/modals/leave-request-modal"
import { OutageReportModal } from "@/components/modals/outage-report-modal"
import { Zap, CalendarDays, Timer } from "lucide-react"
import { clockIn, clockOut, getActiveTimeEntry } from "@/lib/actions/time-entry"
import { toast } from "sonner"

export function LeftSidebar() {
  const [timezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [outageModalOpen, setOutageModalOpen] = useState(false)

  useEffect(() => {
    getActiveTimeEntry().then((entry) => {
      setIsClockedIn(!!entry)
    })
  }, [])

  function handleToggleClock() {
    startTransition(async () => {
      if (isClockedIn) {
        const result = await clockOut()
        if (result.error) {
          toast.error(result.error)
        } else {
          setIsClockedIn(false)
          toast.success("Clocked out successfully")
        }
      } else {
        const result = await clockIn(timezone)
        if (result.error) {
          toast.error(result.error)
        } else {
          setIsClockedIn(true)
          toast.success("Clocked in successfully")
        }
      }
    })
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card">
      <div className="flex items-center gap-2 bg-muted rounded-t-lg px-3 py-2">
        <Timer className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold text-foreground/90">Time Tracking</h2>
      </div>

      <div className="p-3 space-y-2.5">
        <div className="rounded-md border border-border/60 bg-background p-2.5">
          <ClockDate timezone={timezone} />
        </div>

        <ClockTime timezone={timezone} />

        <TimeTrackingButton
          isClockedIn={isClockedIn}
          onToggle={handleToggleClock}
          disabled={isPending}
        />

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-auto py-2 gap-1.5 border-border/60 bg-background hover:bg-accent text-sm font-medium"
            onClick={() => setOutageModalOpen(true)}
          >
            <Zap className="h-4 w-4 text-amber-400" />
            Report Outage
          </Button>
          <Button
            variant="outline"
            className="h-auto py-2 gap-1.5 border-border/60 bg-background hover:bg-accent text-sm font-medium"
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
