import { test, expect } from "@playwright/test"

test.describe("Dashboard Layout", () => {
  test("should display the three-column layout", async ({ page }) => {
    await page.goto("/")

    // Header
    await expect(page.locator("text=Internal Portal")).toBeVisible()

    // Left sidebar - Time Tracking
    await expect(page.locator("text=Time Tracking")).toBeVisible()

    // Center - End of Shift Report
    await expect(page.locator("text=End of Shift Report")).toBeVisible()

    // Right sidebar sections
    await expect(page.locator("text=US Holidays 2025")).toBeVisible()
    await expect(page.locator("text=About Us")).toBeVisible()
    await expect(page.locator("text=Resources")).toBeVisible()
  })

  test("should display the live clock", async ({ page }) => {
    await page.goto("/")

    // Clock should show time with AM/PM
    await expect(page.locator("text=/\\d{2}:\\d{2}:\\d{2}/")).toBeVisible()
    await expect(page.locator("text=/AM|PM/")).toBeVisible()
  })
})

test.describe("Time Tracking", () => {
  test("should display time tracking button", async ({ page }) => {
    await page.goto("/")

    const timeButton = page.locator("button", { hasText: /Time In|Time Out|Loading/ })
    await expect(timeButton).toBeVisible()
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

    await page.locator("button", { hasText: "Leave Request" }).click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible()
  })

  test("should open outage report modal", async ({ page }) => {
    await page.goto("/")

    await page.locator("button", { hasText: "Report Outage" }).click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible()
  })

  test("should open ticket modal via FAB", async ({ page }) => {
    await page.goto("/")

    // Click the floating action button (last button with MessageSquarePlus icon)
    const fab = page.locator("button.fixed")
    await fab.click()
    await expect(page.locator("text=File a Ticket")).toBeVisible()
  })
})

test.describe("Right Sidebar", () => {
  test("should expand holidays list", async ({ page }) => {
    await page.goto("/")

    // Christmas should not be visible initially
    await expect(page.locator("text=Christmas Day")).not.toBeVisible()

    await page.click("text=/Show all/")
    await expect(page.locator("text=Christmas Day")).toBeVisible()
  })

  test("should switch About Us tabs", async ({ page }) => {
    await page.goto("/")

    // Core Values tab should be active by default
    await expect(page.locator("text=Trustworthy")).toBeVisible()

    // Switch to Purpose tab
    await page.click("text=Our Purpose")
    await expect(page.locator("text=Our Mission")).toBeVisible()
    await expect(page.locator("text=Our Vision")).toBeVisible()
  })
})
