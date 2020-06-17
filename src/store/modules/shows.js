import axios from '../../http';
import {
  SHOWS_GET, 
  SHOWS_RESET } from '../mutation-types';

const state = {
  showsFound: []
};

const getters = {};

const actions = {
  async showsGet({ commit, dispatch }, q) {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.VUE_APP_TVMAZE_API_URL}/search/shows`,
        params: { q }
      });
      
      if(res.data.length == 0) {
        return dispatch('showToast', {
          title: 'Not Found',
          message: 'Show could not be found.'
        });
      }
  
      commit(SHOWS_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error.', message: data }, { root: true });
    }
  },
  async save({ dispatch }, show) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/shows',
        data: show
      });

      return data;
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async updateShow({ dispatch }, showId) {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.VUE_APP_TVMAZE_API_URL}/shows/${showId}`
      });
  
      const { data } = await axios({
        method: 'POST',
        url: `/shows/${showId}/update`,
        data: res.data
      });
      
      dispatch('showToast', { title: 'Show Updated.', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error.', message: data }, { root: true });
    }
  },
  reset({ commit }) {
    commit(SHOWS_RESET);
  }
};

const mutations = {
  [SHOWS_GET](state, showsFound) {
    state.showsFound = showsFound.map(({ show }) => ({
      ...show,
      image: show.image || {}
    }));
  },
  [SHOWS_RESET](state) {
    state.showsFound = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
