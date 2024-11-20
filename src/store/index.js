import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/api/register/', userData);
        commit('setUser', response.data);
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
    async login({ commit }, userData) {
      try {
        const response = await axios.post('/api/login/', userData);
        commit('setUser', response.data);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
  },
});
