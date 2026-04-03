"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AboutUs() {
  return (
    <div>
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em] mb-3 px-0.5">
        About Us
      </p>
      <Tabs defaultValue="values">
        <TabsList className="w-full h-7 mb-3">
          <TabsTrigger value="values" className="flex-1 text-[11px]">
            Core Values
          </TabsTrigger>
          <TabsTrigger value="purpose" className="flex-1 text-[11px]">
            Purpose
          </TabsTrigger>
        </TabsList>
        <TabsContent value="values" className="space-y-2">
          <ValueCard
            title="Trustworthy"
            text="We build trust through transparency, integrity, and consistent delivery."
          />
          <ValueCard
            title="Driven"
            text="We push boundaries and take ownership of outcomes with passion and grit."
          />
          <ValueCard
            title="Customer-Obsessed"
            text="Every decision starts and ends with the customer experience."
          />
        </TabsContent>
        <TabsContent value="purpose" className="space-y-2">
          <ValueCard
            title="Mission"
            text="To empower businesses with exceptional talent and technology solutions that drive growth and innovation."
          />
          <ValueCard
            title="Vision"
            text="To be the leading partner for companies seeking transformative digital talent and solutions worldwide."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-background p-2.5">
      <p className="text-xs font-semibold text-foreground/80 mb-0.5">{title}</p>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{text}</p>
    </div>
  )
}
