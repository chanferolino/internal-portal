import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TimeTrackingButton } from "@/components/dashboard/time-tracking-button"

describe("TimeTrackingButton", () => {
  it("shows 'Time In' when not clocked in", () => {
    render(<TimeTrackingButton isClockedIn={false} onToggle={() => {}} />)
    expect(screen.getByText("Time In")).toBeInTheDocument()
  })

  it("shows 'Time Out' when clocked in", () => {
    render(<TimeTrackingButton isClockedIn={true} onToggle={() => {}} />)
    expect(screen.getByText("Time Out")).toBeInTheDocument()
  })

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()

    render(<TimeTrackingButton isClockedIn={false} onToggle={onToggle} />)
    await user.click(screen.getByText("Time In"))

    expect(onToggle).toHaveBeenCalledOnce()
  })

  it("is disabled when disabled prop is true", () => {
    render(<TimeTrackingButton isClockedIn={false} onToggle={() => {}} disabled />)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })
})
