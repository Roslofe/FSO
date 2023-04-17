import React from 'react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('displays blog title & author but no url etc.', () => {
  const blog = {
    title: 'Test blog',
    author: 'Example author',
    url: 'notarealblog.com',
    likes: 3,
    user: {
      name: 'Person 1',
    },
  }
  render(<Blog blog={blog} />)

  const defaultElement = screen.getByText('Test blog Example author')

  expect(defaultElement).toBeDefined()

  const urlElement = screen.queryByText('notarealblog.com')

  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('3')

  expect(likesElement).toBeNull()
})

test('when the view-button is pressed, shows likes', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Example author',
    url: 'notarealblog.com',
    likes: 3,
    user: {
      name: 'Person 1',
    },
  }

  const blogUser = {
    username: 'Person1',
  }
  render(<Blog blog={blog} user={blogUser} />)

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.queryByText('notarealblog.com')
  expect(urlElement).toBeDefined()
  const likesElement = screen.queryByText('3')
  expect(likesElement).toBeDefined()
})

test('when a blog is liked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Example author',
    url: 'notarealblog.com',
    likes: 3,
    user: {
      name: 'Person 1',
      id: 1,
    },
  }

  const blogUser = {
    username: 'Person1',
  }
  const mockLike = jest.fn()

  render(<Blog blog={blog} user={blogUser} updateBlogInfo={mockLike} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockLike.mock.calls).toHaveLength(2)
})
