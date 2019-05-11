import firebase from 'firebase';
import * as types from '../mutation-types';
import { timeNow, objSize, isFutureTime } from '@/js/helper-functions';

const state = {
  watched: {}
}

const getters = {
  watched: state => state.watched
}

const actions = {
  getWatched({ commit }) {
    const uid = firebase.auth().currentUser.uid;
    const watched = firebase.database().ref(`watched/${uid}`);

    watched.on('value', snapshot => {
      commit('GET_WATCHED', snapshot.val());
    });
  }
}

const mutations = {
  [types.GET_WATCHED](state, snapshot) {
    state.watched = snapshot;
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
