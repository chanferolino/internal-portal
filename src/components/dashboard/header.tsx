"use client"

import { CircleUser } from "lucide-react"

export function Header() {
  return (
    <header className="h-12 shrink-0 border-b border-border/60 bg-card px-5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">IP</span>
        </div>
        <span className="text-sm font-semibold tracking-tight text-foreground/90">
          Internal Portal
        </span>
        <span className="text-xs text-muted-foreground font-mono hidden sm:inline ml-1">
          v0.1
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary/60 to-chart-2/60 flex items-center justify-center">
            <CircleUser className="h-3.5 w-3.5 text-foreground/80" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium leading-none text-foreground/80">Employee</p>
          </div>
        </div>
      </div>
    </header>
  )
}
