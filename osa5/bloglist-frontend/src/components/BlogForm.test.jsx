import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')
  const createButton = screen.getByText('create')

  await user.type(title, 'testataan')
  await user.type(author, 'kirjoittaja')
  await user.type(url, 'www.kokeilu.fi')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testataan')
  expect(createBlog.mock.calls[0][0].author).toBe('kirjoittaja')
  expect(createBlog.mock.calls[0][0].url).toBe('www.kokeilu.fi')
})