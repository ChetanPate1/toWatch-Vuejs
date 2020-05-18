import axios from '../../http';
import { UPDATE_USER, SIGN_OUT_USER } from '../mutation-types';

import router from '@/router';

const state = {
  user: {
    email: ''
  }
};

const getters = {
  user: state => state.user,
  token: () => {
    const token = localStorage.getItem('token');
  
    if (!token || token == 'null') {
      return null;
    }
    
    return token;
  }
};

const actions = {
  async signUserIn({ commit }, data) {
    try {
      const res = await axios({
        method: 'POST',
        url: '/login',
        data
      });

      localStorage.setItem('token', res.data.token);
      commit(UPDATE_USER, data);
      
      router.push({ name: 'showCollection' });
    } catch (error) {
      console.log(error);
    }
  },
  signUserOut({ commit }) {
    localStorage.setItem('token', null);
    router.push({ name: 'login' });
    commit(SIGN_OUT_USER);
  },
  async getCurrentUser({ commit }) {
    try {
      const res = await axios({
        method: 'GET',
        url: '/user'
      });

      commit(UPDATE_USER, res.data);
    } catch (error) {
      commit(UPDATE_USER, {});
    } 
  }
};

const mutations = {
  [UPDATE_USER](state, user) {
    state.user.email = user.email;
  },
  [SIGN_OUT_USER](state) {
    state.user = {
      email: ''
    };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
