import firebase from 'firebase';
import * as types from '../mutation-types';
import axios from 'axios';

const state = {
   watchedMovies: {},
   foundMovies: [{"Title":"Lost","Year":"2004–2010","Rated":"TV-14","Released":"22 Sep 2004","Runtime":"44 min","Genre":"Adventure, Drama, Fantasy","Director":"N/A","Writer":"J.J. Abrams, Jeffrey Lieber, Damon Lindelof","Actors":"Jorge Garcia, Josh Holloway, Yunjin Kim, Evangeline Lilly","Plot":"Life is laid bare as a group of plane crash survivors find themselves stranded on a remote Pacific island. The trauma of the crash soon becomes overshadowed by the island itself, where unseen creatures stalk the jungle, paranormal happenings abound and astonishing coincidences reveal themselves. In this unique environment emotions swell as the survivors battle their inner and outer demons, and strive to live together - so that they won't die alone.","Language":"English, Portuguese, Spanish, Arabic, French, Korean, German, Latin, Russian, Japanese","Country":"USA","Awards":"Won 1 Golden Globe. Another 105 wins & 376 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNzhlY2E5NDUtYjJjYy00ODg3LWFkZWQtYTVmMzU4ZWZmOWJkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.4/10"},{"Source":"Rotten Tomatoes","Value":"80%"}],"Metascore":"N/A","imdbRating":"8.4","imdbVotes":"433,948","imdbID":"tt0411008","Type":"series","totalSeasons":"6","Response":"True"}]
}

const getters = {
   watchedMovies: state => state.watchedMovies,
   foundMovies: state => state.foundMovies
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


      // const uid = firebase.auth().currentUser.uid;
      // const ref = firebase.database().ref(`watchedMovies/${ uid }`).push(movie);
      // ref.set(movie);
      // ref.update(movie);
   },
   findMovies({ commit }, movie){
      if(!movie){
         return;
      }
      axios.get(`http://www.omdbapi.com/?t=${ movie.replace(/ /g,'+') }`, {
         params: {
            apikey: '7174c422',
            plot: 'full'
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
   }
}

const mutations = {
   [types.GET_WATCHED_MOVIES](state, snapshot) {
      state.watchedMovies = snapshot;
   },
   [types.UPDATE_FOUND_MOVIES](state, movies) {
      state.foundMovies = movies;
   }
}

export default {
   state,
   getters,
   mutations,
   actions
}
