"use client"

import { useEffect, useState } from "react"

type ClockProps = {
  timezone: string
}

export function useClock(timezone: string) {
  const [time, setTime] = useState("")
  const [period, setPeriod] = useState("")
  const [date, setDate] = useState("")

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

  return { time, period, date }
}

export function Clock({ timezone }: ClockProps) {
  const { time, period, date } = useClock(timezone)

  return (
    <div className="text-center space-y-1">
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">
        {date}
      </p>
      <div className="flex items-baseline justify-center gap-1">
        <p className="text-5xl font-medium tabular-nums tracking-tight text-foreground">
          {time}
        </p>
        <span className="text-sm font-medium text-primary">{period}</span>
      </div>
    </div>
  )
}

export function ClockTime({ timezone }: ClockProps) {
  const { time, period } = useClock(timezone)

  return (
    <div className="text-center py-4">
      <div className="flex items-baseline justify-center gap-1.5">
        <p className="text-6xl font-medium tabular-nums tracking-tight text-foreground">
          {time}
        </p>
        <span className="text-base font-medium text-primary">{period}</span>
      </div>
    </div>
  )
}

export function ClockDate({ timezone }: ClockProps) {
  const { date } = useClock(timezone)

  return (
    <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.15em] text-center">
      {date}
    </p>
  )
}
