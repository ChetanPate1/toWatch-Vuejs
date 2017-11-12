import axios from 'axios';
import * as types from '../mutation-types';

const state = {
  shows: []
}

const getters = {
  mostPopularShows: state => state.shows
}

const actions = {
  getMostPopularShows({ commit }) {
    axios.get('https://www.episodate.com/api/most-popular?page=1')
      .then(res => {
         commit('SET_MOST_POPULAR_SHOWS', res.data.tv_shows);
      });
  }
}

const mutations = {
  [types.SET_MOST_POPULAR_SHOWS](state, shows) {
    state.shows = shows;
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
