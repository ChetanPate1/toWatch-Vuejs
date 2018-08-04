import firebase from 'firebase';
import * as types from '../mutation-types';
import axios from 'axios';

const state = {
   watchedMovies: {},
   foundMovies: [],
   movieDetails: {}
}

const getters = {
   watchedMovies: state => state.watchedMovies,
   foundMovies: state => state.foundMovies,
   movieDetails: state => state.movieDetails
}

const actions = {
   getWatchedMovies({ commit }) {
      const uid = firebase.auth().currentUser.uid;
      const watchedMovies = firebase.database().ref(`watchedMovies/${ uid }`);
      watchedMovies.on('value', snapshot => {
         commit('GET_WATCHED_MOVIES', snapshot.val());
      });
   },
   saveMovie({ commit }, movie){
      movie.PosterXL = movie.Poster.replace('300.jpg', '1000.jpg');

      const uid = firebase.auth().currentUser.uid;
      const ref = firebase.database().ref(`watchedMovies/${ uid }`).push(movie);
      ref.set(movie);
      ref.update(movie);
      commit('EMPTY_FOUND_MOVIES');
   },
   findMovies({ commit }, movie){
      if(!movie){
         return;
      }
      axios.get('http://www.omdbapi.com', {
         params: {
            apikey: '7174c422',
            plot: 'full',
            t: movie.split(',')[0],
            y: movie.split(',')[1]
         }
      })
      .then(function (response) {
         let array = [];
         array.push(response.data);
         commit('UPDATE_FOUND_MOVIES', array);
      });
   },
   deleteMovie({ commit }, ref){
      const uid = firebase.auth().currentUser.uid;
      const movie = firebase.database().ref(`watchedMovies/${ uid }/${ ref }`);
      movie.remove();
   },
   getMovieDetails({ commit }, ref){
      const uid = firebase.auth().currentUser.uid;
      const movieDetails = firebase.database().ref(`watchedMovies/${ uid }/${ ref }`);

      movieDetails.on('value', snapshot => {
         console.log(snapshot.val());
         commit('GET_MOVIE_DETAILS', snapshot.val());
      });
   }
}

const mutations = {
   [types.GET_WATCHED_MOVIES](state, snapshot) {
      state.watchedMovies = snapshot;
   },
   [types.GET_MOVIE_DETAILS](state, snapshot){
      state.movieDetails = snapshot;
   },
   [types.UPDATE_FOUND_MOVIES](state, movies) {
      state.foundMovies = movies;
   },
   [types.EMPTY_FOUND_MOVIES](state) {
      state.foundMovies = [];
   }
}

export default {
   state,
   getters,
   mutations,
   actions
}
