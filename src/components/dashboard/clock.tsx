"use client"

import { useEffect, useState } from "react"

type ClockProps = {
  timezone: string
}

export function Clock({ timezone }: ClockProps) {
  const [time, setTime] = useState<string>("")
  const [period, setPeriod] = useState<string>("")
  const [date, setDate] = useState<string>("")

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      const fullTime = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      const parts = fullTime.split(" ")
      setTime(parts[0])
      setPeriod(parts[1] || "")

      setDate(
        now.toLocaleDateString("en-US", {
          timeZone: timezone,
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      )
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [timezone])

  return (
    <div className="text-center space-y-2">
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em]">
        {date}
      </p>
      <div className="flex items-baseline justify-center gap-1">
        <p className="text-4xl font-bold tabular-nums tracking-tight font-mono text-foreground">
          {time}
        </p>
        <span className="text-sm font-medium text-primary">{period}</span>
      </div>
    </div>
  )
}
