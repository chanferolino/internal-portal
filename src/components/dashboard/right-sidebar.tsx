import { UsHolidays } from "@/components/dashboard/us-holidays"
import { AboutUs } from "@/components/dashboard/about-us"
import { FaqLinks } from "@/components/dashboard/faq-links"

export function RightSidebar() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border/60 bg-card p-4">
        <UsHolidays />
      </div>
      <div className="rounded-lg border border-border/60 bg-card p-4">
        <AboutUs />
      </div>
      <div className="rounded-lg border border-border/60 bg-card p-4">
        <FaqLinks />
      </div>
    </div>
  )
}
