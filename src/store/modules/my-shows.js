import firebase from 'firebase';
import * as types from '../mutation-types';
import axios from 'axios';
import { generateSeasons } from '../../js/generators';
import { hasDaysPast } from '../../js/helper-functions';

const today = new Date();

const state = {
  shows: {},
  foundShows: []
};

const getters = {
  myShows: state => state.shows,
  foundShows: state => state.foundShows
};

const actions = {
  getMyShows({ commit }) {
    const uid = firebase.auth().currentUser.uid;
    const myShows = firebase.database().ref(`shows/${uid}`);
    myShows.on('value', snapshot => {
      commit('GET_MY_SHOWS', snapshot.val());
    });
  },
  searchForShow({ commit }, { type, showName }) {
    axios.get('https://www.omdbapi.com', {
      params: {
        apikey: '7174c422',
        s: showName,
        type
      }
    })
      .then(res => {
        commit('UPDATE_FOUND_SHOWS', res.data.Search);
      });
  },
  saveShow({ commit }, id) {
    axios.get('https://www.omdbapi.com', {
      params: {
        apikey: '7174c422',
        i: id,
        type: 'series'
      }
    })
      .then(res => {
        generateSeasons(res.data).then(show => {
          if (show.episodes.length > 0) {
            const uid = firebase.auth().currentUser.uid;
            const ref = firebase.database().ref(`shows/${uid}`).push(show);
            ref.set(show);
            ref.update(show);

            commit('EMPTY_FOUND_SHOWS');
          }
        });
      });
  },
  deleteShow({ commit }, ref) {
    const uid = firebase.auth().currentUser.uid;
    const show = firebase.database().ref(`shows/${uid}/${ref}`);
    show.remove();
  },
  updateShow({ commit, rootState }, showId) {
    const { imdbID, Title } = rootState.myShows.shows[showId];
    const uid = firebase.auth().currentUser.uid;
    const showRef = firebase.database().ref(`shows/${uid}/${showId}`);

    axios.get('https://www.omdbapi.com', {
      params: {
        apikey: '7174c422',
        i: imdbID,
        type: 'series'
      }
    })
      .then(res => {
        generateSeasons(res.data).then(show => {
          showRef.update(show);
          dispatch("showToast", { title: "Updated", message: `${Title} episode have been updated.` });
        });
      });
  }
};

const mutations = {
  [types.GET_MY_SHOWS](state, snapshot) {
    state.shows = snapshot;
  },
  [types.UPDATE_FOUND_SHOWS](state, foundShows) {
    state.foundShows = foundShows;
  },
  [types.EMPTY_FOUND_SHOWS](state) {
    state.foundShows = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
