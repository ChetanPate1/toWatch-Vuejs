import axios from '../../http';
import {
  MOVIE_GET,
  UPDATE_FOUND_MOVIES,
  EMPTY_FOUND_MOVIES } from '../mutation-types';

const state = {
  movie: {},
  foundMovies: []
};

const getters = {};

const actions = {
  async movieGet({ dispatch, commit }, movieId) {
    try {
      const { data }  = await axios({
        method: 'GET',
        url: `/movies/${movieId}`
      });

      commit(MOVIE_GET, data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async findMovies({ commit, dispatch }, movie) {
    if (!movie) return;
    try {
      const { data } = await axios({
        method: 'GET',
        url: process.env.VUE_APP_OMDB_API_URL,
        params: {
          apikey: process.env.VUE_APP_OMDB_API_KEY,
          plot: 'full',
          t: movie.split(',')[0],
          y: movie.split(',')[1]
        }
      });
      
      if(data.Error) {
        return dispatch('showToast', {
          title: 'Not Found',
          message: 'Movie could not be found.'
        }, { root: true });
      }
  
      const posterUrl = data.Poster;
      const poster = posterUrl.substring(0, posterUrl.length - 7);
  
      commit(UPDATE_FOUND_MOVIES, [{
        ...data,
        Poster: poster + '125.jpg'
      }]);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  emptyFoundMovies({ commit }) {
    commit(EMPTY_FOUND_MOVIES);
  }
};

const mutations = {
  [MOVIE_GET](state, data) {
    state.movie = data;
  },
  [UPDATE_FOUND_MOVIES](state, movies) {
    state.foundMovies = movies;
  },
  [EMPTY_FOUND_MOVIES](state) {
    state.foundMovies = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
