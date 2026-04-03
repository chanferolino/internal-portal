"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

const MOOD_LABELS: Record<string, { emoji: string; label: string }> = {
  EXCITED: { emoji: "🤩", label: "excited" },
  HAPPY: { emoji: "😊", label: "happy" },
  NEUTRAL: { emoji: "😐", label: "neutral" },
  TIRED: { emoji: "😴", label: "tired" },
  STRESSED: { emoji: "😫", label: "stressed" },
}

// TODO: Replace with real data from API
const SAMPLE_REPORTS = [
  {
    id: "1",
    date: "2025-04-02",
    mood: "HAPPY",
    accomplishments:
      "<ul><li>Completed the dashboard layout</li><li>Fixed 3 bugs in the time tracking module</li></ul>",
    challenges:
      "<ul><li>Struggled with timezone edge cases</li><li>Next step: write unit tests</li></ul>",
    managementSupport: null,
  },
  {
    id: "2",
    date: "2025-04-01",
    mood: "NEUTRAL",
    accomplishments:
      "<ul><li>Set up project scaffolding</li><li>Configured Prisma schema and auth</li></ul>",
    challenges:
      "<ul><li>Prisma 7 migration required adapter changes</li><li>Resolved by reading docs</li></ul>",
    managementSupport: "Would appreciate access to the design Figma file.",
  },
]

export function ReportHistory() {
  const reports = SAMPLE_REPORTS

  if (reports.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-sm text-muted-foreground">No reports submitted yet.</p>
        <p className="text-sm text-muted-foreground/60 mt-1">
          Your submitted reports will appear here.
        </p>
      </div>
    )
  }

  return (
    <Accordion className="w-full space-y-2">
      {reports.map((report) => {
        const mood = MOOD_LABELS[report.mood]
        const dateObj = new Date(report.date + "T00:00:00")
        const monthDay = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).toUpperCase()
        const weekday = dateObj
          .toLocaleDateString("en-US", { weekday: "long" })
          .toUpperCase()

        return (
          <AccordionItem
            key={report.id}
            value={report.id}
            className="rounded-lg border border-border/60 bg-background"
          >
            <AccordionTrigger className="hover:no-underline px-4 py-3 rounded-lg hover:bg-accent/40">
              <div className="flex items-center gap-2 text-left text-sm">
                <span className="font-semibold">{monthDay}</span>
                <span className="text-muted-foreground">{weekday}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-4 space-y-4">
                {/* Mood */}
                <p className="text-sm">
                  I feel <span className="font-semibold">{mood?.label}</span>{" "}
                  <span>{mood?.emoji}</span>
                </p>

                <hr className="border-border/40 border-dashed" />

                {/* Accomplishments */}
                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-2">
                    What are your accomplishments today?{" "}
                    <span className="text-muted-foreground font-normal">
                      (Itemized and explain in detail)
                    </span>
                  </p>
                  <div
                    className="text-sm prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-0.5"
                    dangerouslySetInnerHTML={{ __html: report.accomplishments }}
                  />
                </div>

                <hr className="border-border/40 border-dashed" />

                {/* Challenges */}
                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-2">
                    What were your challenges? What are your next steps?{" "}
                    <span className="text-muted-foreground font-normal">
                      (Itemized and explain in detail)
                    </span>
                  </p>
                  <div
                    className="text-sm prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-0.5"
                    dangerouslySetInnerHTML={{ __html: report.challenges }}
                  />
                </div>

                <hr className="border-border/40 border-dashed" />

                {/* Management Support */}
                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-2">
                    How can the company best support you at this time?{" "}
                    <span className="text-muted-foreground font-normal">
                      (Only Management sees this)
                    </span>
                  </p>
                  <p className="text-sm">
                    {report.managementSupport || "N/A"}
                  </p>
                </div>

                {/* Edit button */}
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
