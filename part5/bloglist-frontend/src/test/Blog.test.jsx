import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from '../components/Blog'
import CreateBlogForm from '../components/CreateBlogForm'
import blogService from '../services/blogs'
import mockBlogs from './mockBlogs'

vi.mock('../services/blogs')

describe('Blog component tests', () => {
  test('url and likes are hidden by default and shown after clicking show details', async () => {
    const blog = mockBlogs[0]
    render(<Blog blog={blog} notify={vi.fn()} setBlogs={vi.fn()} />)

    const user = userEvent.setup()
    const showButton = screen.getByRole('button', { name: /show details/i })

    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(/likes/i)).toBeNull()

    await user.click(showButton)

    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`likes ${blog.likes}`)),
    ).toBeInTheDocument()
  })

  test('clicking like button calls blogService.update twice', async () => {
    const blog = mockBlogs[0]
    blogService.update.mockResolvedValue({ ...blog, likes: blog.likes + 1 })

    render(<Blog blog={blog} notify={vi.fn()} setBlogs={vi.fn()} />)

    const user = userEvent.setup()
    const showButton = screen.getByRole('button', { name: /show details/i })
    await user.click(showButton)

    const likeButton = screen.getByRole('button', { name: /like/i })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogService.update).toHaveBeenCalledTimes(2)
  })

  test('CreateBlogForm calls handler with correct details on submit', async () => {
    const mockSetBlogs = vi.fn()
    const mockNotify = vi.fn()
    const mockOnSuccess = vi.fn()
    const user = userEvent.setup()

    render(
      <CreateBlogForm
        setBlogs={mockSetBlogs}
        notify={mockNotify}
        onSuccess={mockOnSuccess}
      />,
    )

    const newBlog = {
      title: 'Test Blog',
      author: 'Tester',
      url: 'http://test.com',
    }

    blogService.create.mockResolvedValue(newBlog)

    const titleInput = screen.getByLabelText(/title/i)
    const authorInput = screen.getByLabelText(/author/i)
    const urlInput = screen.getByLabelText(/url/i)

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)

    const createButton = screen.getByRole('button', { name: /create/i })
    await user.click(createButton)

    expect(blogService.create).toHaveBeenCalledTimes(1)
    expect(blogService.create).toHaveBeenCalledWith(newBlog)
    expect(mockSetBlogs).toHaveBeenCalled()
    expect(mockNotify).toHaveBeenCalledWith(
      `a new blog ${newBlog.title} by ${newBlog.author} added`,
    )
    expect(mockOnSuccess).toHaveBeenCalled()
  })
})
