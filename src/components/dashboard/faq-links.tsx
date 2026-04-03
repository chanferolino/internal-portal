import { ArrowUpRight } from "lucide-react"

const FAQ_LINKS = [
  { label: "Club Portal", href: "#" },
  { label: "Bulletin", href: "#" },
  { label: "Payroll FAQ Sheet", href: "#" },
  { label: "Product Request", href: "#" },
  { label: "Referral Form", href: "#" },
]

export function FaqLinks() {
  return (
    <div>
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em] mb-3 px-0.5">
        Resources
      </p>
      <div className="space-y-0.5">
        {FAQ_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center justify-between py-1.5 px-2 rounded-md text-xs text-foreground/70 hover:text-foreground hover:bg-accent/40 transition-colors group"
          >
            <span>{link.label}</span>
            <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  )
}
