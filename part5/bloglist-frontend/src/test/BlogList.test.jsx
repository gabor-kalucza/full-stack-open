import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogList from '../components/BlogList'
import mockBlogs from './mockBlogs'

describe('BlogList component tests', () => {
  test('renders all blogs with title and author, but not url or likes by default', () => {
    const notify = vi.fn()
    const setBlogs = vi.fn()
    render(<BlogList blogs={mockBlogs} notify={notify} setBlogs={setBlogs} />)

    mockBlogs.forEach((blog) => {
      screen.getByText(`${blog.title} ${blog.author}`)
      const blogArticle = screen
        .getByText(`${blog.title} ${blog.author}`)
        .closest('article')
      expect(within(blogArticle).queryByText(blog.url)).toBeNull()
      expect(within(blogArticle).queryByText(/likes/i)).toBeNull()
    })
  })

  test('url and likes appear for specific blog when show details is clicked', async () => {
    const notify = vi.fn()
    const setBlogs = vi.fn()
    render(<BlogList blogs={mockBlogs} notify={notify} setBlogs={setBlogs} />)

    const user = userEvent.setup()
    const blog = mockBlogs[0]
    const blogArticle = screen
      .getByText(`${blog.title} ${blog.author}`)
      .closest('article')
    const showButton = within(blogArticle).getByRole('button', {
      name: /show details/i,
    })
    await user.click(showButton)

    expect(within(blogArticle).getByText(blog.url)).toBeInTheDocument()
    expect(
      within(blogArticle).getByText(new RegExp(`likes ${blog.likes}`)),
    ).toBeInTheDocument()
  })
})
