import * as types from '../mutation-types';
import * as firebase from 'firebase';
const state = {
  user: {
    uid: '',
    email: ''
  }
}

const getter = {
  user: state => state.user
}

const actions = {
  signUserIn({ commit }, cred) {
    firebase.auth()
      .signInWithEmailAndPassword(cred.email, cred.password)
      .then(user => {
        console.log(user);
      });

    // commit(types., cred)
  },
  signUserOut() {
    firebase.auth().signOut();
  }
}

const mutations = {
  [types.SIGN_IN_USER](state, cred) {

  }
}

export default {
  state,
  actions
}
