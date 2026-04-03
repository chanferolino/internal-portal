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
        <aside className="w-[315px] shrink-0 overflow-y-auto px-2 py-3">
          <div className="sticky top-0">
            <LeftSidebar />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-2 py-3">
          <CenterColumn />
        </main>

        <aside className="w-[315px] shrink-0 overflow-y-auto px-2 py-3">
          <RightSidebar />
        </aside>

        <TicketingFab />
      </div>
    </>
  )
}
