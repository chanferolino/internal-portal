"use client"

import { cn } from "@/lib/utils"

const MOODS = [
  { value: "EXCITED", emoji: "🤩", label: "Excited" },
  { value: "HAPPY", emoji: "😊", label: "Happy" },
  { value: "NEUTRAL", emoji: "😐", label: "Neutral" },
  { value: "TIRED", emoji: "😴", label: "Tired" },
  { value: "STRESSED", emoji: "😫", label: "Stressed" },
] as const

type MoodPickerProps = {
  value: string | null
  onChange: (value: string) => void
}

export function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground/80">
        How are you feeling right now?
      </p>
      <div className="flex gap-1.5">
        {MOODS.map((mood) => {
          const isActive = value === mood.value
          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => onChange(mood.value)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 rounded-lg border p-2.5 transition-all duration-150 cursor-pointer",
                isActive
                  ? "border-primary/50 bg-primary/10 shadow-sm shadow-primary/10"
                  : "border-border/60 bg-background hover:bg-accent hover:border-border"
              )}
            >
              <span className={cn("text-xl transition-transform", isActive && "scale-110")}>
                {mood.emoji}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {mood.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
