import { defineStore } from 'pinia';
import api from '../api';

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
        const res = await api.post('/auth/login', { username, password });
        this.token = res.data.token;
        this.username = res.data.username;
        localStorage.setItem('token', this.token);
        localStorage.setItem('username', this.username);
        api.setToken(this.token);
        return true;
      } catch {
        return false;
      }
    },
    logout() {
      this.token = null;
      this.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      api.setToken(null);
    }
  }
});