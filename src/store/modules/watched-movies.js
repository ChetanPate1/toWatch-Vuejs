import firebase from 'firebase';
import * as types from '../mutation-types';

const state = {
   watchedMovies: {}
}

const getters = {
   watchedMovies: state => state.watchedMovies
}

const actions = {
   getWatchedMovies({ commit }) {
      const uid = firebase.auth().currentUser.uid;
      const watchedMovies = firebase.database().ref(`watchedMovies/${ uid }`);
      watchedMovies.on('value', snapshot => {
         commit('GET_WATCHED_MOVIES', snapshot.val());
      });
   },
   saveMovies({ commit }, movie){

      const uid = firebase.auth().currentUser.uid;
      const ref = firebase.database().ref(`watchedMovies/${ uid }`).push(movie);
      ref.set(movie);
      ref.update(movie);
   },
   deleteShow({ commit }, ref){
      const uid = firebase.auth().currentUser.uid;
      const movie = firebase.database().ref(`watchedMovies/${ uid }/${ ref }`);
      movie.remove();
   }
}

const mutations = {
   [types.GET_WATCHED_MOVIES](state, snapshot) {
      state.watchedMovies = snapshot;
   }
}

export default {
   state,
   getters,
   mutations,
   actions
}
