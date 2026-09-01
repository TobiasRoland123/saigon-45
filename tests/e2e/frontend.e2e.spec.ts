import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Saigon 45/)

    // The heading depends on whether the database is seeded, so assert only
    // that it renders and is not the starter template's.
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
    await expect(heading).not.toContainText(/payload/i)
  })

  test('serves Saigon 45 social preview metadata', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      'Saigon 45',
    )
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'da_DK')

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    // Absolute media URLs used to get the app URL glued onto the front of them,
    // producing `https://saigon-45.vercel.apphttps//pub-...r2.dev/image.webp`.
    expect(ogImage).toBeTruthy()
    expect(() => new URL(ogImage!)).not.toThrow()
    expect(ogImage).not.toMatch(/https?\/\//)

    // No Payload starter branding may reach public metadata.
    const metaContents = await page
      .locator('meta[content]')
      .evaluateAll((tags) => tags.map((tag) => tag.getAttribute('content') ?? ''))
    const title = await page.title()

    for (const content of [...metaContents, title]) {
      expect(content).not.toMatch(/payload/i)
    }
  })
})
