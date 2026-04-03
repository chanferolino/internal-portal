"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const HOLIDAYS_2025 = [
  { date: "Jan 1", name: "New Year's Day" },
  { date: "Jan 20", name: "MLK Jr. Day" },
  { date: "Feb 17", name: "Presidents' Day" },
  { date: "May 26", name: "Memorial Day" },
  { date: "Jun 19", name: "Juneteenth" },
  { date: "Jul 4", name: "Independence Day" },
  { date: "Sep 1", name: "Labor Day" },
  { date: "Oct 13", name: "Columbus Day" },
  { date: "Nov 11", name: "Veterans Day" },
  { date: "Nov 27", name: "Thanksgiving" },
  { date: "Dec 25", name: "Christmas Day" },
]

const COLLAPSED_COUNT = 5

export function UsHolidays() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded
    ? HOLIDAYS_2025
    : HOLIDAYS_2025.slice(0, COLLAPSED_COUNT)

  return (
    <div>
      <div className="space-y-0.5">
        {visible.map((h) => (
          <div
            key={h.name}
            className="flex justify-between items-center py-1.5 px-2 rounded-md text-sm hover:bg-accent/40 transition-colors"
          >
            <span className="text-foreground/80">{h.name}</span>
            <span className="text-muted-foreground text-sm">
              {h.date}
            </span>
          </div>
        ))}
      </div>
      {HOLIDAYS_2025.length > COLLAPSED_COUNT && (
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-1 mt-2 px-2 text-sm text-muted-foreground hover:text-foreground/80 transition-colors cursor-pointer"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Show all {HOLIDAYS_2025.length} <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  )
}
