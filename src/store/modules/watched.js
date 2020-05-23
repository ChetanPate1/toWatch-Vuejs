import { GET_WATCHED } from '../mutation-types';

const state = {
  watched: {}
};

const getters = {
  watched: state => state.watched
};

const actions = {
  getWatched({ commit }) {
    // const uid = auth().currentUser.uid;
    // const watched = database().ref(`watched/${uid}`);

    // watched.on('value', snapshot => {
    //   commit('GET_WATCHED', snapshot.val());
    // });
  }
};

const mutations = {
  [GET_WATCHED](state, snapshot) {
    state.watched = snapshot;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
