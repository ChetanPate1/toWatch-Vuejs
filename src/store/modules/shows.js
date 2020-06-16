import axios from '../../http';
import {
  SHOWS_GET, 
  SHOWS_RESET } from '../mutation-types';

const state = {
  showsFound: []
};

const getters = {};

const actions = {
  async showsGet({ commit, dispatch }, { type, showName }) {
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

    commit(SHOWS_GET, res.data.Search);
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
  reset({ commit }) {
    commit(SHOWS_RESET);
  }
};

const mutations = {
  [SHOWS_GET](state, showsFound) {
    state.showsFound = showsFound;
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
