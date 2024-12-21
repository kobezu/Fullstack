import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async updatedObject => {
  const url = `${baseUrl}/${updatedObject.id}`
  const userId = updatedObject.user.id
  updatedObject.user = userId

  const response = await axios.put(url, updatedObject)
  return response.data
}

const deleteBlog = async deletedObject => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${deletedObject.id}`

  const response = await axios.delete(url, config)
}
 
export default { getAll, setToken, create, put, deleteBlog }