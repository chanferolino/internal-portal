import { test, expect } from "@playwright/test"

test.use({ viewport: { width: 1600, height: 900 } })

test.describe("Dashboard Layout", () => {
  test("should display the three-column layout", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    await expect(page.locator("text=Internal Portal")).toBeVisible()
    await expect(page.locator("text=Time Tracking").first()).toBeVisible()
    await expect(page.locator("text=End of Shift Report")).toBeVisible()
    await expect(page.locator("text=US Holidays 2025").last()).toBeVisible()
    await expect(page.locator("text=About Us").last()).toBeVisible()
    await expect(page.locator("text=Resources").last()).toBeVisible()
  })

  test("should display the live clock", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=/\\d{2}:\\d{2}:\\d{2}/").first()).toBeVisible()
    await expect(page.locator("text=/AM|PM/").first()).toBeVisible()
  })
})

test.describe("Time Tracking", () => {
  test("should display time tracking button", async ({ page }) => {
    await page.goto("/")

    const timeButton = page.getByRole("button", { name: /Time In|Time Out|Loading/ })
    await expect(timeButton.first()).toBeVisible()
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
    await page.waitForLoadState("networkidle")

    await page.getByRole("button", { name: "Leave Request" }).first().click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible({ timeout: 15000 })
  })

  test("should open outage report modal", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    await page.getByRole("button", { name: "Report Outage" }).first().click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible({ timeout: 15000 })
  })

  test("should open ticket modal via FAB", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    const fab = page.locator("button.fixed")
    await fab.click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible({ timeout: 15000 })
  })
})

test.describe("Right Sidebar", () => {
  test("should expand holidays list", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    const sidebar = page.locator("aside").last()
    await expect(sidebar.locator("text=Christmas Day")).not.toBeVisible()
    await sidebar.locator("text=/Show all/").click()
    await expect(sidebar.locator("text=Christmas Day")).toBeVisible()
  })

  test("should switch About Us tabs", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    const sidebar = page.locator("aside").last()
    await expect(sidebar.locator("text=Trustworthy")).toBeVisible()

    await sidebar.locator("text=Our Purpose").click()
    await expect(sidebar.locator("text=Our Mission")).toBeVisible()
    await expect(sidebar.locator("text=Our Vision")).toBeVisible()
  })
})
