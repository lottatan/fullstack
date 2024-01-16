import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const like = async blog => {
  const url = baseUrl + '/' + blog.id
  await axios.put(url, blog)
}

const deleteBlog = async blog => {
  const url = baseUrl + '/' + blog.id
  const config = { headers: { Authorization: token } }
}

export default {
  getAll, create, update, setToken, like, deleteBlog
}