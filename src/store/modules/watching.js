import axios from '../../http';
import {
  WATCHING_GET,
  WATCHING_ADD,
  WATCHING_DELETE,
  WATCHING_EPISODES_GET,
  WATCHING_TOGGLE_EPISODE_WATCHED } from '../mutation-types';

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
      dispatch('showToast', { title: 'Error', message: data.message });
    }
  },
  async addToWatching({ dispatch, commit }, id) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `/watching/${id}`
      });

      commit(WATCHING_ADD, data.watching);
      dispatch('showToast', { title: 'Watching Already', message: data.message });
    } catch ({ status, data }) {
      if(status === 409){
        return dispatch('showToast', { title: 'Watching Already', message: data.message });
      }

      dispatch('showToast', { title: 'Error', message: data.message });
    }
  },
  async deleteWatching({ dispatch, commit }, id) {
    try {
      const { data }  = await axios({
        method: 'DELETE',
        url: `/watching/${id}`
      });

      commit(WATCHING_DELETE, id);

      dispatch('showToast', { title: 'Show Deleted', message: data.message });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message });
    }
  },
  async toggleWatched({ commit, dispatch }, { id, seasonId, episodeId }) {
    try {
      const { data }  = await axios({
        method: 'POST',
        url: `/watched-episode/${episodeId}`
      });

      commit(WATCHING_TOGGLE_EPISODE_WATCHED, { 
        id, seasonId, episodeId, episode: data 
      });
    } catch ({ data }) {
      dispatch('showToast', { title: 'Error', message: data.message });
    }
  },
  updatedWatched({ state, rootState }, watchlistId) {
    // const watchlistItem = state.watchlist[watchlistId];
    // const showId = watchlistItem.showId;
    // const uid = auth().currentUser.uid;
    // const ref = database().ref(`watched/${uid}/${showId}`);
    // const watched = {
    //   show: rootState.myShows.shows[showId].Title,
    //   watched: watchlistItem.unwatched,
    //   on: watchlistItem.on
    // };

    // ref.update(watched);
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
    state.watching = state.watching.map(item => {
      if (item._id === id) {
        item.show.seasons.map(season => {
          if (season._id === seasonId) {
            season.episodes = episodes;
          }

          return season;
        });
      }

      return item;
    });
  },
  [WATCHING_TOGGLE_EPISODE_WATCHED](state, { id, seasonId, episodeId, episode }) {
    state.watching = state.watching.map(item => {
      if (item._id === id) {
        item.show.seasons.map(s => {
          if (s._id === seasonId) {
            s.episodes = s.episodes.map(e => {
              if(e._id === episodeId) {
                return episode;
              }
              return e;
            });
          }

          return s;
        });
      }

      return item;
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
