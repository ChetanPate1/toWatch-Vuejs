import axios from '../../http';
import { WATCHED_SHOWS_GET, WATCHED_SHOWS_DELETE } from '../mutation-types';

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
  },
  async deleteFromWatchedShows({ dispatch, commit }, { showId }) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: `/watched-shows/${showId}`
      });

      commit(WATCHED_SHOWS_DELETE, showId);
      dispatch('showToast', { title: 'Deleted', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async continueWatching({ dispatch }, { showId, show }) {
    try {
      await axios({
        method: 'POST',
        url: `/watched-shows/${showId}/continue`
      });
      
      dispatch('showToast', { title: 'Continue Watching', message: show }, { root: true });
      return true;
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data }, { root: true });
      return false;
    }
  },
  async rewatching({ dispatch }, { showId, show }) {
    try {
      await axios({
        method: 'POST',
        url: `/watched-shows/${showId}/rewatch`
      });
      
      dispatch('showToast', { title: 'Rewatching', message: show }, { root: true });
      return true;
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data }, { root: true });
      return false;
    }
  }
};

const mutations = {
  [WATCHED_SHOWS_GET](state, watchedShows) {
    state.watchedShows = watchedShows;
  },
  [WATCHED_SHOWS_DELETE](state, showId) {
    state.watchedShows = state.watchedShows.filter(item => item.showId != showId);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
