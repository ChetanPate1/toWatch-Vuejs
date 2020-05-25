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
        url: '/watchings'
      });

      commit(WATCHING_GET, res.data);
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async addToWatching({ dispatch, commit }, { showId, seasonId, episodeId }) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/watchings',
        data: { showId, seasonId, episodeId }
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
  async deleteWatching({ dispatch, commit }, { id, deleteReason }) {
    try {
      const { data }  = await axios({
        method: 'DELETE',
        url: `/watchings/${id}`,
        data: { deleteReason }
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
      
      commit(WATCHING_EPISODES_GET, { id: watchingId, seasonId, episodes: data  });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async toggleWatched({ commit, dispatch }, { watchingId, seasonId, episodeId }) {
    try {
      const { data }  = await axios({
        method: 'POST',
        url: `/watched-episodes/${watchingId}/${episodeId}`
      });
      
      commit(WATCHING_TOGGLE_EPISODE_WATCHED, { 
        watchingId, seasonId, episodeId, episode: data.watched 
      });
      commit(WATCHING_ON_UPDATE, { watchingId, data });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
  },
  async getWatchingOn({ commit, dispatch }, watchingId) {
    try {
      const  { data } = await axios({
        method: 'GET',
        url: `/watchings/${watchingId}/on`
      });

      commit(WATCHING_ON_UPDATE, { watchingId, data });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message }, { root: true });
    }
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
    state.watching = state.watching.filter(item => item._id != id);
  },
  [WATCHING_EPISODES_GET](state, { id, seasonId, episodes }) {
    const { onEpisode, show } = state.watching.find(item => item._id == id);
    const currentSeason = show.seasons.find(item => item._id == seasonId);
    const seasonNumber = show.seasons.indexOf(currentSeason) + 1;
    const episodesBefore = seasonNumber < onEpisode.season;
    const currentSeasonEpisodesBefore = (item) => seasonNumber == onEpisode.season && item.number <= onEpisode.episode
    const watchingEpisodes = episodes.map(item => ({
      ...item,
      watched: episodesBefore || currentSeasonEpisodesBefore(item)
    }))
    
    state.watching.map(item => {
      if (item._id === id) {
        item.show.seasons.map(season => {
          if (season._id == seasonId) {
            season.episodes = watchingEpisodes;
          }

          return season;
        });
      }

      return item;
    });
  },
  [WATCHING_TOGGLE_EPISODE_WATCHED](state, { watchingId, seasonId, episode }) {
    state.watching = state.watching.map(watch => {
      if (watch._id === watchingId) {
        watch.show.seasons.map(season => {
          if (season._id === seasonId) {
            const episodeIndex = season.episodes.reduce((acc, item, i) => {
              if(item._id == episode._id) {
                return i + 1;
              }

              return acc;
            }, 0); 

            season.episodes.map((item, index) => {
              item.watched = index < episodeIndex;
              return item;
            });
          }

          return season;
        });
      }

      return watch;
    });
  },
  [WATCHING_ON_UPDATE](state, { watchingId, data }) {
    state.watching = state.watching.map(watch => {
      if (watch._id === watchingId) {
        watch.onEpisode = data.on;
        watch.behindCount = data.behindCount;
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