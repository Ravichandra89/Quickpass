import { test, expect } from "@playwright/test";

test("Home page loads", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/QuickPass/i);
});
