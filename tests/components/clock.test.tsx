import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { ClockTime, ClockDate } from "@/components/dashboard/clock"

describe("ClockTime", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2025-04-03T10:30:45"))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("renders the time", () => {
    render(<ClockTime timezone="Asia/Manila" />)
    // The time should be displayed (format depends on locale)
    const timeElement = screen.getByText(/\d{2}:\d{2}:\d{2}/)
    expect(timeElement).toBeInTheDocument()
  })

  it("renders AM/PM indicator", () => {
    render(<ClockTime timezone="Asia/Manila" />)
    const period = screen.getByText(/AM|PM/)
    expect(period).toBeInTheDocument()
  })
})

describe("ClockDate", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2025-04-03T10:30:45"))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("renders the date", () => {
    render(<ClockDate timezone="Asia/Manila" />)
    expect(screen.getByText(/Apr/i)).toBeInTheDocument()
  })
})
