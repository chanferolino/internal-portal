"use client"

import { cn } from "@/lib/utils"
import { LogIn, LogOut } from "lucide-react"

type TimeTrackingButtonProps = {
  isClockedIn: boolean
  onToggle: () => void
}

export function TimeTrackingButton({ isClockedIn, onToggle }: TimeTrackingButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full h-11 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer",
        isClockedIn
          ? "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/25"
          : "bg-primary text-primary-foreground hover:opacity-90 shadow-sm shadow-primary/20"
      )}
    >
      {isClockedIn ? "Time Out" : "Time In"}
      {isClockedIn ? <LogOut className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
    </button>
  )
}
