import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    likeBlog(state, action) {
      const id = action.payload
      const blogToLike = state.find((b) => b.id === id)
      const updated = { ...blogToLike, likes: blogToLike.likes + 1 }
      return state.map((blog) => (blog.id !== id ? blog : updated))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { createBlog, setBlogs, likeBlog, removeBlog } = blogSlice.actions

export default blogSlice.reducer
