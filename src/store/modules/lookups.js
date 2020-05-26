import axios from '../../http';
import { SEASONS_GET, EPISODES_GET } from '../mutation-types';

const state = {
  seasons: [],
  episodes: []
};

const getters = {
  seasons: state => state.seasons,
  episodes: state => state.episodes
};

const actions = {
  async getSeasons({ commit, dispatch }, showId) {
    try {
      commit('resetState', 'seasons');
      const res = await axios({
        method: 'GET',
        url: `/seasons/${showId}`
      });

      commit(SEASONS_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data }, { root: true });
    }
  },
  async getEpisodes({ commit, dispatch }, seasonId) {
    try {
      commit('resetState', 'episodes');
      const res = await axios({
        method: 'GET',
        url: `/episodes/${seasonId}`
      });

      commit(EPISODES_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data }, { root: true });
    }
  }
}

const mutations = {
  [SEASONS_GET](state, data) {
    state.seasons = data;
  },
  [EPISODES_GET](state, data) {
    state.episodes = data;
  },
  resetState(state, prop) {
    state[prop] = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
