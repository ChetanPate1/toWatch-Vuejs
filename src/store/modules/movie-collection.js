import axios from '../../http';
import { 
  MOVIE_COLLECTION_GET,
  MOVIE_COLLECTION_ADD,
  MOVIE_COLLECTION_DELETE } from '../mutation-types';

const state = {
  collection: []
};

const getters = {};

const actions = {
  async getMovieCollection({ commit, dispatch }) {
    try {
      const res = await axios({
        method: 'GET',
        url: '/movie-collections'
      });
      
      commit(MOVIE_COLLECTION_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async saveToMovieCollectionMovie({ commit, dispatch }, movie) {
    try {
      const posterUrl = movie.Poster.substring(0, movie.Poster.length - 7);
      const { data } = await axios({
        method: 'POST',
        url: '/movie-collections',
        data: {
          ...movie,
          Poster: posterUrl + '210.jpg',
          PosterXL: posterUrl + '720.jpg'
        }
      });

      commit(MOVIE_COLLECTION_ADD, data.movie);
      
      dispatch('showToast', { title: 'Movie added.', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async deleteFromMovieCollection({ commit, dispatch }, id) {
    try {
      const { data }  = await axios({
        method: 'DELETE',
        url: `/movie-collections/${id}`
      });

      commit(MOVIE_COLLECTION_DELETE, id);

      dispatch('showToast', { title: 'Show Deleted', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  }
};

const mutations = {
  [MOVIE_COLLECTION_GET](state, collection) {
    state.collection = collection;
  },
  [MOVIE_COLLECTION_ADD](state, movie) {
    state.collection = [...state.collection, movie];
  },
  [MOVIE_COLLECTION_DELETE](state, id) {
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
