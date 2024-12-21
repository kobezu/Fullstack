  const { test, expect, beforeEach, describe } = require('@playwright/test')
  const { loginWith, createBlog } = require('./helper')

  describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http:localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })

      await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
      await expect(page.getByTestId('username')).toBeVisible()
      await expect(page.getByTestId('password')).toBeVisible()
    })

    describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await expect(page.getByText('mluukkai logged in')).toBeVisible()
      })

      test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'eioikea')
        await expect(page.getByText('wrong username or password')).toBeVisible()
      })
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
      })
    
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'test title', 'test author', 'test url')
        await expect(page.getByText('a new blog test title')).toBeVisible()

        const blogElement = await page.locator('.blog', { hasText: 'test title' })
        await blogElement.getByRole('button', { name: 'show' }).click()
        await expect(page.getByText('test author')).toBeVisible()
        await expect(page.getByText('test url')).toBeVisible()
      })
    })
  })