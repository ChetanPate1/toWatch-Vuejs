import axios from '../../http';

import router from '@/router';

const state = {};

const getters = {};

const actions = {
  async signUserIn({ dispatch }, data) {
    try {
      const res = await axios({
        method: 'POST',
        url: '/login',
        data
      });

      await dispatch('storage/save', {
        prop: 'token',
        value: res.data.token
      }, { root: true });
      
      await dispatch('storage/save', {
        prop: 'user',
        value: { email: data.email } 
      }, { root: true });

      router.push({ name: 'watching' });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async signUserOut({ dispatch }) {
    await dispatch('storage/reset', null, { root: true });
    router.push({ name: 'login' });
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
