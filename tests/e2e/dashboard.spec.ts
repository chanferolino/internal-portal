import { test, expect } from "@playwright/test"

test.describe("Dashboard Layout", () => {
  test("should display the three-column layout", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=Internal Portal")).toBeVisible()
    await expect(page.locator("text=Time Tracking")).toBeVisible()
    await expect(page.locator("text=End of Shift Report")).toBeVisible()
    await expect(page.locator("text=US Holidays 2025")).toBeVisible()
    await expect(page.locator("text=About Us")).toBeVisible()
    await expect(page.locator("text=Resources")).toBeVisible()
  })

  test("should display the live clock", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=/\\d{2}:\\d{2}:\\d{2}/")).toBeVisible()
    await expect(page.locator("text=/AM|PM/")).toBeVisible()
  })
})

test.describe("Time Tracking", () => {
  test("should display time tracking button", async ({ page }) => {
    await page.goto("/")

    const timeButton = page.getByRole("button", { name: /Time In|Time Out|Loading/ })
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

    await page.getByRole("button", { name: "Leave Request" }).click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible({ timeout: 10000 })
  })

  test("should open outage report modal", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("button", { name: "Report Outage" }).click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible({ timeout: 10000 })
  })

  test("should open ticket modal via FAB", async ({ page }) => {
    await page.goto("/")

    const fab = page.locator("button.fixed")
    await fab.click()
    await expect(page.locator("[data-slot=dialog-content]")).toBeVisible({ timeout: 10000 })
  })
})

test.describe("Right Sidebar", () => {
  test("should expand holidays list", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=Christmas Day")).not.toBeVisible()
    await page.click("text=/Show all/")
    await expect(page.locator("text=Christmas Day")).toBeVisible()
  })

  test("should switch About Us tabs", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=Trustworthy")).toBeVisible()

    await page.click("text=Our Purpose")
    await expect(page.locator("text=Our Mission")).toBeVisible()
    await expect(page.locator("text=Our Vision")).toBeVisible()
  })
})
