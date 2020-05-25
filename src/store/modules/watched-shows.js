import axios from '../../http';
import { WATCHED_SHOWS_GET } from '../mutation-types';

const state = {
  watchedShows: []
};

const getters = {};

const actions = {
  async getWatchedShows({ dispatch, commit }) {
    try {
      const res = await axios({
        method: 'GET',
        url: '/watched-shows'
      });

      commit(WATCHED_SHOWS_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  }
};

const mutations = {
  [WATCHED_SHOWS_GET](state, watchedShows) {
    state.watchedShows = watchedShows;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
