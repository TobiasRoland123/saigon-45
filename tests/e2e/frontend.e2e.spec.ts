import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    await context.newPage()
  })

  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Payload Website Template/)
    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Payload Website Template')
  })
})
