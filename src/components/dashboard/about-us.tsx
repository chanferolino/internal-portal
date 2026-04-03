"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sprout, Globe } from "lucide-react"

const TABS = ["Core Values", "Our Purpose"] as const

const VALUES = [
  {
    title: "Trustworthy",
    text: "We build trust through transparency, integrity, and consistent delivery.",
  },
  {
    title: "Driven",
    text: "We push boundaries and take ownership of outcomes with passion and grit.",
  },
  {
    title: "Customer-Obsessed",
    text: "Every decision starts and ends with the customer experience.",
  },
]

export function AboutUs() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Core Values")

  return (
    <div className="space-y-3 pt-2">
      <div className="flex border-b border-border/60">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 pb-2 text-sm font-semibold uppercase tracking-wider text-center transition-colors cursor-pointer",
              activeTab === tab
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground/70"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Core Values" && (
        <div className="space-y-2">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-md border border-border/60 bg-background p-2.5">
              <p className="text-sm font-semibold text-foreground/80 mb-0.5">{v.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Our Purpose" && (
        <div className="space-y-2">
          <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Sprout className="h-4 w-4 text-emerald-600" />
              <p className="text-sm font-semibold text-foreground/80">Our Mission</p>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed pl-6">
              To <span className="font-semibold">lift people</span> by helping the{" "}
              <span className="font-semibold">companies we serve</span> win
            </p>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-sky-50 to-cyan-50 p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Globe className="h-4 w-4 text-sky-600" />
              <p className="text-sm font-semibold text-foreground/80">Our Vision</p>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed pl-6">
              Be expert in building <span className="font-semibold">high-impact, world-class international teams</span>{" "}
              that power business growth
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
