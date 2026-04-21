import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5173/api',
  headers: { 'Content-Type': 'application/json' }
})

export default {
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url)
}