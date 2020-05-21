import axios from '../../http';
import {
  SHOW_COLLECTION_GET,
  SHOW_COLLECTION_ADD,
  SHOW_COLLECTION_DELETE,
  UPDATE_FOUND_SHOWS, 
  EMPTY_FOUND_SHOWS } from '../mutation-types';

const state = {
  collection: [],
  foundShows: []
};

const getters = {
  collection: state => state.collection,
  foundShows: state => state.foundShows
};

const actions = {
  async getShowCollection({ commit, dispatch }) {
    try {
      const res = await axios({
        method: 'GET',
        url: '/show-collection'
      });

      commit('SHOW_COLLECTION_GET', res.data);
    } catch ({ data }) {
      dispatch('showToast', {
        title: 'Error',
        message: data.message
      });
    }
  },
  async searchForShow({ commit, dispatch }, { type, showName }) {
    const res = await axios({
      method: 'GET',
      url: process.env.VUE_APP_OMDB_API_URL,
      params: {
        apikey: process.env.VUE_APP_OMDB_API_KEY,
        s: showName,
        type
      }
    });
    
    if(res.data.Error) {
      return dispatch('showToast', {
        title: 'Not Found',
        message: 'Show could not be found.'
      });
    }

    commit('UPDATE_FOUND_SHOWS', res.data.Search);
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
        url: '/show-collection',
        data: res.data
      });

      commit('SHOW_COLLECTION_ADD', data.show);
      
      dispatch('showToast', { title: 'Show added.', message: data.message });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message });
    }

    commit('EMPTY_FOUND_SHOWS');
  },
  async deleteFromShowCollection({ commit, dispatch }, { id }) {
    try {
      const { data }  = await axios({
        method: 'DELETE',
        url: `/show-collection/${id}`
      });

      commit('SHOW_COLLECTION_DELETE', id);

      dispatch('showToast', { title: 'Show Deleted', message: data.message });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message });
    }
  },
  updateShow({ dispatch }, showId) {
    
  },
  emptyFoundShows({ commit }) {
    commit('EMPTY_FOUND_SHOWS');
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
  },
  [UPDATE_FOUND_SHOWS](state, foundShows) {
    state.foundShows = foundShows;
  },
  [EMPTY_FOUND_SHOWS](state) {
    state.foundShows = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
