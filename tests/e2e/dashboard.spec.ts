import { test, expect } from "@playwright/test"

// Use a wide viewport so the 3-column layout is fully visible
test.use({ viewport: { width: 1440, height: 900 } })

test.describe("Dashboard Layout", () => {
  test("should display the three-column layout", async ({ page }) => {
    await page.goto("/")

    // Header
    await expect(page.locator("text=Internal Portal")).toBeVisible()

    // Left sidebar - Time Tracking
    await expect(page.locator("text=Time Tracking").first()).toBeVisible()

    // Center - End of Shift Report
    await expect(page.locator("text=End of Shift Report")).toBeVisible()

    // Right sidebar sections (last() because the aside is after the inline mobile version in DOM)
    await expect(page.locator("text=US Holidays 2025").last()).toBeVisible()
    await expect(page.locator("text=About Us").last()).toBeVisible()
    await expect(page.locator("text=Resources").last()).toBeVisible()
  })

  test("should display the live clock", async ({ page }) => {
    await page.goto("/")

    // Clock should show time with AM/PM
    await expect(page.locator("text=/\\d{2}:\\d{2}:\\d{2}/").first()).toBeVisible()
    await expect(page.locator("text=/AM|PM/").first()).toBeVisible()
  })
})

test.describe("Time Tracking", () => {
  test("should toggle between Time In and Time Out", async ({ page }) => {
    await page.goto("/")

    const timeButton = page.locator("button:visible", { hasText: /Time In|Time Out/ }).first()
    await expect(timeButton).toBeVisible()

    const initialText = await timeButton.textContent()

    await timeButton.click()
    await page.waitForTimeout(1000)

    const newText = await timeButton.textContent()
    expect(newText).not.toBe(initialText)
  })
})

test.describe("Shift Report", () => {
  test("should show mood picker with 5 options", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=How are you feeling right now?")).toBeVisible()
    await expect(page.locator("text=Excited")).toBeVisible()
    await expect(page.locator("text=Happy")).toBeVisible()
    await expect(page.locator("text=Neutral")).toBeVisible()
    await expect(page.locator("text=Tired")).toBeVisible()
    await expect(page.locator("text=Stressed")).toBeVisible()
  })

  test("should show report history section", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("text=Report History")).toBeVisible()
  })
})

test.describe("Modals", () => {
  test("should open leave request modal", async ({ page }) => {
    await page.goto("/")

    await page.locator("button:visible", { hasText: "Leave Request" }).first().click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible()
  })

  test("should open outage report modal", async ({ page }) => {
    await page.goto("/")

    await page.locator("button:visible", { hasText: "Report Outage" }).first().click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible()
  })

  test("should open ticket modal via FAB", async ({ page }) => {
    await page.goto("/")

    const fab = page.locator("button.fixed")
    await fab.click()
    await expect(page.locator("text=File a Ticket")).toBeVisible()
  })
})

test.describe("Right Sidebar", () => {
  test("should expand holidays list", async ({ page }) => {
    await page.goto("/")

    const sidebar = page.locator("aside").last()

    await expect(sidebar.locator("text=Christmas Day")).not.toBeVisible()
    await sidebar.locator("text=/Show all/").click()
    await expect(sidebar.locator("text=Christmas Day")).toBeVisible()
  })

  test("should switch About Us tabs", async ({ page }) => {
    await page.goto("/")

    const sidebar = page.locator("aside").last()

    // Core Values tab should be active by default
    await expect(sidebar.locator("text=Trustworthy")).toBeVisible()

    // Switch to Purpose tab
    await sidebar.locator("text=Our Purpose").click()
    await expect(sidebar.locator("text=Our Mission")).toBeVisible()
    await expect(sidebar.locator("text=Our Vision")).toBeVisible()
  })
})
