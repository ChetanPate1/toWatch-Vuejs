import axios from '../../http';
import {
  SHOW_COLLECTION_GET,
  SHOW_COLLECTION_ADD,
  SHOW_COLLECTION_DELETE } from '../mutation-types';

const state = {
  collection: []
};

const getters = {};

const actions = {
  async getShowCollection({ commit, dispatch }) {
    try {
      const res = await axios({
        method: 'GET',
        url: '/show-collections'
      });

      commit(SHOW_COLLECTION_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', {
        title: 'Error',
        message: data.message
      }, { root: true });
    }
  },
  async saveToShowCollection({ commit, dispatch }, movie) {
    try {
      const res = await axios({
        method: 'GET',
        url: process.env.VUE_APP_OMDB_API_URL,
        params: {
            apikey: process.env.VUE_APP_OMDB_API_KEY,
            i: movie.imdbID,
            type: 'series'
          }
      });

      const { data } = await axios({
        method: 'POST',
        url: '/show-collections',
        data: res.data
      });

      commit(SHOW_COLLECTION_ADD, data.show);
      
      dispatch('showToast', { title: 'Show added.', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async deleteFromShowCollection({ commit, dispatch }, { id }) {
    try {
      const { data }  = await axios({
        method: 'DELETE',
        url: `/show-collections/${id}`
      });

      commit(SHOW_COLLECTION_DELETE, id);

      dispatch('showToast', { title: 'Show Deleted', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  updateShow({ dispatch }, showId) {
    
  }
};

const mutations = {
  [SHOW_COLLECTION_GET](state, shows) {
    state.collection = shows;
  },
  [SHOW_COLLECTION_ADD](state, show) {
    state.collection = [...state.collection, show];
  },
  [SHOW_COLLECTION_DELETE](state, id) {
    state.collection = state.collection.filter(item => item._id !== id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
