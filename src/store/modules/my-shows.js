import http from '../../http';
import { auth, database } from 'firebase';
import { GET_MY_SHOWS, UPDATE_FOUND_SHOWS, EMPTY_FOUND_SHOWS } from '../mutation-types';
import axios from 'axios';
import { generateSeasons } from '../../js/generators';

const state = {
  shows: [],
  foundShows: []
};

const getters = {
  myShows: state => state.shows,
  foundShows: state => state.foundShows
};

const actions = {
  async getMyShows({ commit }) {
    try {
      const res = await http({
        method: 'GET',
        url: '/show-collection'
      });

      commit('GET_MY_SHOWS', res.data);
    } catch (error) {
      commit('GET_MY_SHOWS', []);
    }
  },
  async searchForShow({ commit, dispatch }, { type, showName }) {
    const res = await axios({
      method: 'GET',
      url: 'https://www.omdbapi.com',
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

    commit('UPDATE_FOUND_SHOWS', res.data.Search);
  },
  async saveShow({ commit, dispatch, rootState }, movie) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://www.omdbapi.com',
        params: {
            apikey: process.env.VUE_APP_OMDB_API_KEY,
            i: movie.imdbID,
            type: 'series'
          }
      });

      const show = await http({
        method: 'POST',
        url: '/show-collection',
        data
      });
      
    } catch (error) {
       dispatch('showToast', {
        title: 'Error',
        message: error
      });
    }

    commit('EMPTY_FOUND_SHOWS');
  },
  async deleteShow({ dispatch }, { id }) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: `/show-collection/${id}`
      });

      dispatch('showToast', { title: 'Show Deleted', message: data });
    } catch (error) {
      dispatch('showToast', { title: 'Error', message: error });
    }
  },
  updateShow({ dispatch, rootState }, showId) {
    const { imdbID, Title } = rootState.myShows.shows[showId];
    const uid = auth().currentUser.uid;
    const showRef = database().ref(`shows/${uid}/${showId}`);

    axios
      .get('https://www.omdbapi.com', {
        params: {
          apikey: process.env.VUE_APP_OMDB_API_KEY,
          i: imdbID,
          type: 'series'
        }
      })
      .then(res => {
        generateSeasons(res.data).then(show => {
          showRef.update(show);
          dispatch('showToast', { title: 'Updated', message: `${Title} episode have been updated.` });
        });
      });
  },
  emptyFoundShows({ commit }) {
    commit('EMPTY_FOUND_SHOWS');
  }
};

const mutations = {
  [GET_MY_SHOWS](state, snapshot) {
    state.shows = snapshot;
  },
  [UPDATE_FOUND_SHOWS](state, foundShows) {
    state.foundShows = foundShows;
  },
  [EMPTY_FOUND_SHOWS](state) {
    state.foundShows = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
