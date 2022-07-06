import axios from "axios"
const baseUrl = "/api/blogs"

let token = ""

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (values) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, values, config)

  return response
}

const increaseLikes = (values, id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("values from", values)
  const response = axios.put(`${baseUrl}/${id}`, values, config)

  return response
}

const deletePost = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)

  return response
}

export default { getAll, create, setToken, increaseLikes, deletePost }
