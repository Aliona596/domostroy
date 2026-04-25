import { defineStore } from 'pinia'
import api from '../api'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(username, password) {
      try {
        const response = await api.post('/auth/login', { username, password })
        this.token = response.data.token
        this.username = response.data.username
        localStorage.setItem('token', this.token)
        localStorage.setItem('username', this.username)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    logout() {
      this.token = null
      this.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      delete api.defaults.headers.common['Authorization']
    }
  }
})