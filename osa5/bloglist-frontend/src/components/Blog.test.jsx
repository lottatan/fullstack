import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
    title: 'testiotsikko',
    author: 'testaaja',
    url: 'www.testi.fi',
    likes: 0,
    user: {
        username: 'testiusername',
        name: 'testinimi'
    }
}

test('renders content', () => {
    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()
    
    render(<Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} show={true}/>)

    const element = screen.getByText("testiotsikko")
    expect(element).toBeDefined()
})

test('clicking the view button shows url, likes and user', async () => {
    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()

    render(<Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} show={true}/>)
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    user.click(button)
  
    await waitFor(() => {
        expect(screen.getByText('www.testi.fi')).toBeInTheDocument()
        expect(screen.getByText('Likes:')).toBeInTheDocument()
        expect(screen.getByText('testinimi')).toBeInTheDocument()
      })
  })

test('clicking the like button twice calls event handler twice', async () => {
    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()
  
    render(<Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} show={true}/>)

    const viewbutton = screen.getByText('view')
    await userEvent.click(viewbutton)

    
    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
})