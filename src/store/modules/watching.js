import axios from '../../http';
import {
  WATCHING_GET,
  WATCHING_ADD,
  WATCHING_DELETE,
  WATCHING_EPISODES_GET,
  WATCHING_TOGGLE_EPISODE_WATCHED,
  WATCHING_ON_UPDATE } from '../mutation-types';

const state = {
  watching: []
};

const getters = {
  watching: state => state.watching
};

const actions = {
  async getWatching({ commit, dispatch }) {
    try {
      const res = await axios({
        method: 'GET',
        url: '/watching'
      });

      commit(WATCHING_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async addToWatching({ dispatch, commit }, id) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `/watching/${id}`
      });

      commit(WATCHING_ADD, data.watching);
      dispatch('showToast', { title: 'Watching Already', message: data.message }, { root: true });
    } catch ({ status, data }) {
      if(status === 409){
        return dispatch('showToast', { title: 'Watching Already', message: data.message }, { root: true });
      }

      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async deleteWatching({ dispatch, commit }, id) {
    try {
      const { data }  = await axios({
        method: 'DELETE',
        url: `/watching/${id}`
      });

      commit(WATCHING_DELETE, id);

      dispatch('showToast', { title: 'Show Deleted', message: data.message }, { root: true });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async getWatchedEpisodes({ commit, dispatch }, { watchingId, seasonId }) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `/watched-episodes/${watchingId}/${seasonId}`
      });
      
      commit(WATCHING_EPISODES_GET, { id: watchingId, seasonId, episodes: data });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async toggleWatched({ commit, dispatch }, { watchingId, seasonId, episodeId }) {
    try {
      const { data }  = await axios({
        method: 'POST',
        url: `/watched-episode/${watchingId}/${episodeId}`
      });
      
      commit(WATCHING_TOGGLE_EPISODE_WATCHED, { 
        watchingId, seasonId, episodeId, episodes: data.watched 
      });
      commit(WATCHING_ON_UPDATE, { watchingId, on: data.on });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async getWatchingOn({ commit, dispatch }, watchingId) {
    try {
      const  { data } = await axios({
        method: 'GET',
        url: `/watching/on/${watchingId}`
      });

      commit(WATCHING_ON_UPDATE, { watchingId, on: data });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  updatedWatched({ state, rootState }, watchlistId) {
    
  }
}

const mutations = {
  [WATCHING_GET](state, watching) {
    state.watching = watching;
  },
  [WATCHING_ADD](state, watching) {
    state.watching = [...state.watching, watching];
  },
  [WATCHING_DELETE](state, id) {
    state.watching = state.watching.filter(item => item._id === id);
  },
  [WATCHING_EPISODES_GET](state, { id, seasonId, episodes }) {
    state.watching.map(item => {
      if (item._id === id) {
        item.seasons.map(season => {
          if (season._id === seasonId) {
            season.episodes = episodes;
          }

          return season;
        });
      }

      return item;
    });
  },
  [WATCHING_TOGGLE_EPISODE_WATCHED](state, { watchingId, seasonId, episodes }) {
    state.watching = state.watching.map(watch => {
      if (watch._id === watchingId) {
        watch.seasons.map(season => {
          if (season._id === seasonId) {
            season.episodes.map(item => {
              const found = episodes.find(e => e.episodeId == item._id);

              item.watched = found ? true : false;
              return item;
            });
          }

          return season;
        });
      }

      return watch;
    });
  },
  [WATCHING_ON_UPDATE](state, { watchingId, on }) {
    state.watching = state.watching.map(watch => {
      if (watch._id === watchingId) {
        watch.on = on;
      }

      return watch;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
