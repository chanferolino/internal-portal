"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const MOOD_LABELS: Record<string, { emoji: string; label: string }> = {
  EXCITED: { emoji: "🤩", label: "Excited" },
  HAPPY: { emoji: "😊", label: "Happy" },
  NEUTRAL: { emoji: "😐", label: "Neutral" },
  TIRED: { emoji: "😴", label: "Tired" },
  STRESSED: { emoji: "😫", label: "Stressed" },
}

// TODO: Replace with real data from API
const SAMPLE_REPORTS = [
  {
    id: "1",
    date: "2025-04-02",
    mood: "HAPPY",
    accomplishments:
      "Completed the dashboard layout. Fixed 3 bugs in the time tracking module.",
    challenges:
      "Struggled with timezone edge cases. Next step: write unit tests.",
    managementSupport: null,
  },
  {
    id: "2",
    date: "2025-04-01",
    mood: "NEUTRAL",
    accomplishments:
      "Set up project scaffolding. Configured Prisma schema and auth.",
    challenges:
      "Prisma 7 migration required adapter changes. Resolved by reading docs.",
    managementSupport: "Would appreciate access to the design Figma file.",
  },
]

export function ReportHistory() {
  const reports = SAMPLE_REPORTS

  if (reports.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-sm text-muted-foreground">No reports submitted yet.</p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Your submitted reports will appear here.
        </p>
      </div>
    )
  }

  return (
    <Accordion className="w-full space-y-1">
      {reports.map((report) => {
        const mood = MOOD_LABELS[report.mood]
        const dateFormatted = new Date(
          report.date + "T00:00:00"
        ).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })

        return (
          <AccordionItem
            key={report.id}
            value={report.id}
            className="rounded-md border-none"
          >
            <AccordionTrigger className="hover:no-underline px-2 rounded-md hover:bg-accent/40">
              <div className="flex items-center gap-2.5 text-left">
                <span className="text-base">{mood?.emoji}</span>
                <div>
                  <p className="text-xs font-medium text-foreground/80">
                    {dateFormatted}
                  </p>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {report.accomplishments}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1 pl-8 pr-2">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Accomplishments
                  </p>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {report.accomplishments}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Challenges & Next Steps
                  </p>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {report.challenges}
                  </p>
                </div>
                {report.managementSupport && (
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Management Support
                    </p>
                    <p className="text-xs text-foreground/80 leading-relaxed">
                      {report.managementSupport}
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
