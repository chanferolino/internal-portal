import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MoodPicker } from "@/components/dashboard/mood-picker"

describe("MoodPicker", () => {
  it("renders all 5 mood options", () => {
    render(<MoodPicker value={null} onChange={() => {}} />)

    expect(screen.getByText("Excited")).toBeInTheDocument()
    expect(screen.getByText("Happy")).toBeInTheDocument()
    expect(screen.getByText("Neutral")).toBeInTheDocument()
    expect(screen.getByText("Tired")).toBeInTheDocument()
    expect(screen.getByText("Stressed")).toBeInTheDocument()
  })

  it("calls onChange when a mood is clicked", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<MoodPicker value={null} onChange={onChange} />)

    await user.click(screen.getByText("Happy"))
    expect(onChange).toHaveBeenCalledWith("HAPPY")
  })

  it("highlights the selected mood", () => {
    render(<MoodPicker value="EXCITED" onChange={() => {}} />)

    const excitedButton = screen.getByText("Excited").closest("button")
    expect(excitedButton?.className).toContain("border-primary")
  })

  it("displays the question label", () => {
    render(<MoodPicker value={null} onChange={() => {}} />)
    expect(screen.getByText("How are you feeling right now?")).toBeInTheDocument()
  })
})
