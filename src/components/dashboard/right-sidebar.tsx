import { UsHolidays } from "@/components/dashboard/us-holidays"
import { AboutUs } from "@/components/dashboard/about-us"
import { FaqLinks } from "@/components/dashboard/faq-links"
import { Calendar, Heart, HelpCircle } from "lucide-react"

export function RightSidebar() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border/60 bg-card">
        <div className="flex items-center gap-2 bg-muted rounded-t-lg px-3 py-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground/90">US Holidays 2025</h2>
        </div>
        <div className="p-3">
          <UsHolidays />
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card">
        <div className="flex items-center gap-2 bg-muted rounded-t-lg px-3 py-2">
          <Heart className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground/90">About Us</h2>
        </div>
        <div className="p-3">
          <AboutUs />
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card">
        <div className="flex items-center gap-2 bg-muted rounded-t-lg px-3 py-2">
          <HelpCircle className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold text-foreground/90">Resources</h2>
        </div>
        <div className="p-3">
          <FaqLinks />
        </div>
      </div>
    </div>
  )
}
