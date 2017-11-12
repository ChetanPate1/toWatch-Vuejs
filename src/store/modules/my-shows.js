import firebase from 'firebase';
import * as types from '../mutation-types';

const state = {
  shows: {}
}

const getters = {
  myShows: state => state.shows
}

const actions = {
  getMyShows({ commit }, payload) {
    console.log(payload);
    const dbMyShows = firebase.database().ref(`shows/${ payload.uid }`);
    dbMyShows.on('value', snapshot => {
      commit('GET_MY_SHOWS', snapshot.val());
    });
  }
}

const mutations = {
  [types.GET_MY_SHOWS](state, snapshot) {
    state.shows = snapshot;
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
