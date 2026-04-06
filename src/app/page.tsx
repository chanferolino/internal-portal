import { Header } from "@/components/dashboard/header"
import { LeftSidebar } from "@/components/dashboard/left-sidebar"
import { CenterColumn } from "@/components/dashboard/center-column"
import { RightSidebar } from "@/components/dashboard/right-sidebar"
import { TicketingFab } from "@/components/dashboard/ticketing-fab"

export default function Home() {
  return (
    <>
      <Header />
      {/* Desktop: 3 columns | Tablet: 2 columns | Mobile: stacked */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:block w-[315px] shrink-0 overflow-y-auto px-2 py-3">
          <div className="sticky top-0">
            <LeftSidebar />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-3 py-3 lg:px-2">
          {/* Mobile: show time tracking inline above the form */}
          <div className="lg:hidden mb-4">
            <LeftSidebar />
          </div>
          <CenterColumn />
          {/* Mobile/Tablet: show right sidebar below */}
          <div className="xl:hidden mt-4 space-y-4">
            <RightSidebar />
          </div>
        </main>

        <aside className="hidden xl:block w-[315px] shrink-0 overflow-y-auto px-2 py-3">
          <RightSidebar />
        </aside>

        <TicketingFab />
      </div>
    </>
  )
}
