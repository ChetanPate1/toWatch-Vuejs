import firebase from 'firebase';
import * as types from '../mutation-types';

const state = {
  shows: {}
}

const getters = {
  myShows: state => state.shows
}

const actions = {
  getMyShows({ commit }) {
    const uid = firebase.auth().currentUser.uid;
    const myShows = firebase.database().ref(`shows/${ uid }`);
    myShows.on('value', snapshot => {
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
