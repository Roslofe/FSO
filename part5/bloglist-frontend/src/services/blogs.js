import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getSingular = async id => {
  const completeBlogData = (await getAll()).find(b => b.id === id)

  return completeBlogData
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const blogData = (await axios.post(baseUrl, newBlog, config)).data
  return await getSingular(blogData.id)
}

const updateLikes = async (id, updated) => {
  const result = await axios.put(`${baseUrl}/${id}`, updated)
  return await getSingular(result.data.id)
}

const deleteBlog = async toDelete => {
  const config = {
    headers: { Authorization: token },
  }
  const result = await axios.delete(`${baseUrl}/${toDelete.id}`, config)
  return result
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createNew, updateLikes, deleteBlog }