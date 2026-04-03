"use client"

import { useState } from "react"
import { TicketModal } from "@/components/modals/ticket-modal"
import { MessageSquarePlus } from "lucide-react"

export function TicketingFab() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="fixed bottom-5 right-5 h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center z-50 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <MessageSquarePlus className="h-5 w-5" />
      </button>
      <TicketModal open={open} onOpenChange={setOpen} />
    </>
  )
}
