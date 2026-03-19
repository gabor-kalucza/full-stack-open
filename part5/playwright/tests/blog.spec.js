const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  describe('Blog app', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: /login in to application/i }),
      ).toBeVisible()

      await expect(page.getByRole('textbox').first()).toBeVisible()

      await expect(page.getByLabel(/password/i)).toBeVisible()

      await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
    })
  })
})
