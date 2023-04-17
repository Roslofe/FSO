import React from 'react'
import BlogForm from './BlogForm'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('creating a new blog sends correct props', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()
  const { container } = render(<BlogForm addBlog={addBlog}/>)
  const titleInput = container.querySelector('.blog-title')
  await user.type(titleInput, 'Example blog')
  const authorInput = container.querySelector('.blog-author')
  await user.type(authorInput, 'Example author')
  const urlInput = container.querySelector('.blog-url')
  await user.type(urlInput, 'notarealblog.com')
  const createButton = screen.getByText('create')
  await user.click(createButton)
  expect(addBlog.mock.calls).toHaveLength(1)
  const mockProps = addBlog.mock.calls[0][0]
  expect(mockProps.title).toBe('Example blog')
  expect(mockProps.author).toBe('Example author')
  expect(mockProps.url).toBe('notarealblog.com')

})