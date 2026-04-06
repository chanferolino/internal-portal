import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UsHolidays } from "@/components/dashboard/us-holidays"

describe("UsHolidays", () => {
  it("renders first 5 holidays by default", () => {
    render(<UsHolidays />)

    expect(screen.getByText("New Year's Day")).toBeInTheDocument()
    expect(screen.getByText("MLK Jr. Day")).toBeInTheDocument()
    expect(screen.getByText("Presidents' Day")).toBeInTheDocument()
    expect(screen.getByText("Memorial Day")).toBeInTheDocument()
    expect(screen.getByText("Juneteenth")).toBeInTheDocument()
    expect(screen.queryByText("Christmas Day")).not.toBeInTheDocument()
  })

  it("shows all holidays when expanded", async () => {
    const user = userEvent.setup()
    render(<UsHolidays />)

    await user.click(screen.getByText(/Show all/))

    expect(screen.getByText("Christmas Day")).toBeInTheDocument()
    expect(screen.getByText("Thanksgiving")).toBeInTheDocument()
  })

  it("collapses back when clicking show less", async () => {
    const user = userEvent.setup()
    render(<UsHolidays />)

    await user.click(screen.getByText(/Show all/))
    await user.click(screen.getByText(/Show less/))

    expect(screen.queryByText("Christmas Day")).not.toBeInTheDocument()
  })
})
