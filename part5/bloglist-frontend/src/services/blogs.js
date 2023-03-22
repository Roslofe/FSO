import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
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
  const completeBlogData = (await getAll()).find(b => b.id === blogData.id)

  return completeBlogData
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createNew }