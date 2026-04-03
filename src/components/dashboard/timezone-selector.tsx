"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TIMEZONES = [
  { value: "Asia/Manila", label: "PHT — Philippine Standard Time" },
  { value: "America/New_York", label: "EST — Eastern Time" },
  { value: "America/Chicago", label: "CST — Central Time" },
  { value: "America/Denver", label: "MST — Mountain Time" },
  { value: "America/Los_Angeles", label: "PST — Pacific Time" },
  { value: "America/Anchorage", label: "AKST — Alaska Time" },
  { value: "Pacific/Honolulu", label: "HST — Hawaii Time" },
  { value: "Europe/London", label: "GMT — Greenwich Mean Time" },
  { value: "Europe/Berlin", label: "CET — Central European Time" },
  { value: "Asia/Tokyo", label: "JST — Japan Standard Time" },
  { value: "Asia/Singapore", label: "SGT — Singapore Time" },
  { value: "Australia/Sydney", label: "AEST — Australian Eastern Time" },
]

type TimezoneSelectorProps = {
  value: string
  onChange: (value: string | null) => void
}

export function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        {TIMEZONES.map((tz) => (
          <SelectItem key={tz.value} value={tz.value}>
            {tz.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
