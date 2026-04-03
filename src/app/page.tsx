import { Header } from "@/components/dashboard/header"
import { LeftSidebar } from "@/components/dashboard/left-sidebar"
import { CenterColumn } from "@/components/dashboard/center-column"
import { RightSidebar } from "@/components/dashboard/right-sidebar"
import { TicketingFab } from "@/components/dashboard/ticketing-fab"

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[280px] shrink-0 border-r border-border/60 bg-card overflow-y-auto px-4 py-5">
          <div className="sticky top-0">
            <LeftSidebar />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <CenterColumn />
        </main>

        <aside className="w-[280px] shrink-0 overflow-y-auto px-4 py-5">
          <RightSidebar />
        </aside>

        <TicketingFab />
      </div>
    </>
  )
}
