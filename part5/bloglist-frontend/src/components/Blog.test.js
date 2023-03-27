import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

test('displays blog title & author but no url etc.', () => {
  const blog = {
    title: 'Test blog',
    author: 'Example author',
    url: 'notarealblog.com',
    likes: 3,
    user: {
      name: 'Person 1'
    }
  }
  render(<Blog blog={blog}/>)
  const defaultElement = screen.getByText('Test blog Example author')
  expect(defaultElement).toBeDefined()
  const urlElement = screen.queryByText('notarealblog.com')
  expect(urlElement).toBeNull()
  const likesElement = screen.queryByText('3')
  expect(likesElement).toBeNull()
})