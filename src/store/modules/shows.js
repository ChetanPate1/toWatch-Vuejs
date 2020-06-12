import axios from '../../http';
import {
  UPDATE_FOUND_SHOWS, 
  EMPTY_FOUND_SHOWS } from '../mutation-types';

const state = {
  foundShows: []
};

const getters = {};

const actions = {
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

    commit(UPDATE_FOUND_SHOWS, res.data.Search);
  },
  async updateShow({ dispatch }, { imdbId , showId }) {
    try {
      const res = await axios({
        method: 'GET',
        url: process.env.VUE_APP_OMDB_API_URL,
        params: {
            apikey: process.env.VUE_APP_OMDB_API_KEY,
            i: imdbId,
            type: 'series'
          }
      });
  
      const { data } = await axios({
        method: 'POST',
        url: `/shows/${showId}/update`,
        data: res.data
      });
      
      dispatch('showToast', { title: 'Show Updated.', message: data.message }, { root: true });
      return res.data.show;
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error.', message: data }, { root: true });
      return data;
    }
  },
  async save({ dispatch }, movie) {
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
        url: '/shows',
        data: res.data
      });

      return data;
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  emptyFoundShows({ commit }) {
    commit(EMPTY_FOUND_SHOWS);
  }
};

const mutations = {
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
