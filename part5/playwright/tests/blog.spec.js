const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  const apiUrl = 'http://localhost:3003'
  const appUrl = 'http://localhost:5173'

  beforeEach(async ({ page, request }) => {
    await request.post(`${apiUrl}/api/testing/reset`)
    await request.post(`${apiUrl}/api/users`, {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'secret',
      },
    })
    await page.goto(appUrl)
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
    beforeEach(async ({ page }) => {
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

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('My First Blog')
      await page.getByLabel('author').fill('John Doe')
      await page.getByLabel('url').fill('http://example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(
        page.getByText('My First Blog by John Doe added'),
      ).toBeVisible()

      const blog = page
        .locator('article', { hasText: 'My First Blog John Doe' })
        .last()
      await blog.getByRole('button', { name: /show details/i }).click()

      const likesLocator = blog.locator('span', { hasText: /^likes/i })
      const initialLikesText = await likesLocator.textContent()
      const initialLikes = parseInt(initialLikesText.replace(/\D/g, ''), 10)

      await blog.getByRole('button', { name: /like/i }).click()
      await expect(likesLocator).toHaveText(`likes ${initialLikes + 1}`)
    })

    test('the user who added a blog can delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('Blog To Delete')
      await page.getByLabel('author').fill('Jane Doe')
      await page.getByLabel('url').fill('http://delete.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(
        page.getByText('Blog To Delete by Jane Doe added'),
      ).toBeVisible()

      const blog = page
        .locator('article', { hasText: 'Blog To Delete Jane Doe' })
        .last()
      await blog.getByRole('button', { name: /show details/i }).click()

      page.once('dialog', (dialog) => dialog.accept())

      await blog.getByRole('button', { name: /remove/i }).click()

      await expect(blog).toHaveCount(0)
    })
  })

  test('blogs are ordered by likes, highest first', async ({
    page,
    request,
  }) => {
    const loginResponse = await request.post(`${apiUrl}/api/login`, {
      data: { username: 'testuser', password: 'secret' },
    })
    const { token } = await loginResponse.json()

    const blogs = [
      { title: 'a', author: 'A', url: 'http://a.com', likes: 1 },
      { title: 'b', author: 'B', url: 'http://b.com', likes: 5 },
      { title: 'c', author: 'C', url: 'http://c.com', likes: 3 },
    ]

    for (const blog of blogs) {
      await request.post(`${apiUrl}/api/blogs`, {
        data: blog,
        headers: { Authorization: `Bearer ${token}` },
      })
    }

    await page.reload()

    const articles = page.locator('article')
    const count = await articles.count()
    const likesArray = []

    for (let i = 0; i < count; i++) {
      const article = articles.nth(i)
      await article.getByRole('button', { name: /show details/i }).click()
      const likesText = await article
        .locator('span', { hasText: /^likes/i })
        .textContent()
      likesArray.push(parseInt(likesText.replace(/\D/g, ''), 10))
    }

    const sortedLikes = [...likesArray].sort((a, b) => b - a)
    expect(likesArray).toEqual(sortedLikes)
  })
})
