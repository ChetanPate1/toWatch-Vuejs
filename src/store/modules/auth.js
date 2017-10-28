import * as types from '../mutation-types';
import * as firebase from 'firebase';
import router from '@/router';

const state = {
  user: {
    uid: '',
    email: '',
    isLoggedIn: false
  },
}

const getters = {
  user: state => state.user
}

const actions = {
  signUserIn({ commit }, cred) {
    firebase.auth()
      .signInWithEmailAndPassword(cred.email, cred.password)
      .then(user => {
          commit('SIGN_IN_USER', user);
          router.push('my-shows');
      });
  },
  signUserOut({ commit }) {
    firebase.auth()
      .signOut()
      .then(() => {
        commit('SIGN_OUT_USER');
      });
  },
  getCurrentUser({ commit }) {
    const user = firebase.auth()
      .onAuthStateChanged(user => {
          if(user){
            commit('SIGN_IN_USER', user);
          }else{
            router.push('login');
          }
      });
  }
}

const mutations = {
  [types.SIGN_IN_USER](state, user) {
    state.user = {
      uid: user.uid,
      email: user.email,
      isLoggedIn: true
    };
  },
  [types.SIGN_OUT_USER](state) {
    state.user = {
      uid: '',
      email: '',
      isLoggedIn: false
    };
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
