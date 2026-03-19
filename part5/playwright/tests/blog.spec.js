const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'secret',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /login in to application/i }),
    ).toBeVisible()

    await expect(page.getByLabel(/username/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()

    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(
        page.getByText(/invalid username or password/i),
      ).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')

      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Test User',
          username: 'testuser',
          password: 'secret',
        },
      })

      await page.goto('http://localhost:5173')

      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.getByLabel('title').fill('My First Blog')
      await page.getByLabel('author').fill('John Doe')
      await page.getByLabel('url').fill('http://example.com')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText('My First Blog by John Doe added'),
      ).toBeVisible()

      await expect(
        page.locator('article', { hasText: 'My First Blog John Doe' }).first(),
      ).toBeVisible()
    })
  })
})
