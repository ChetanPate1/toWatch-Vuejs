import { auth, database } from 'firebase';
import { GET_WATCHED_MOVIES, GET_MOVIE_DETAILS, UPDATE_FOUND_MOVIES, EMPTY_FOUND_MOVIES } from '../mutation-types';
import axios from 'axios';

const state = {
  watchedMovies: {},
  foundMovies: [],
  movieDetails: {}
};

const getters = {
  watchedMovies: state => state.watchedMovies,
  foundMovies: state => state.foundMovies,
  movieDetails: state => state.movieDetails
};

const actions = {
  getWatchedMovies({ commit }) {
    const uid = auth().currentUser.uid;
    const watchedMovies = database().ref(`watchedMovies/${uid}`);
    watchedMovies.on('value', snapshot => {
      commit('GET_WATCHED_MOVIES', snapshot.val());
    });
  },
  saveMovie({ commit, dispatch, rootState }, movie) {
    const uid = auth().currentUser.uid;
    let poster = movie.Poster;
    let posterUrl = poster.substring(0, poster.length - 7);
    movie.Poster = posterUrl + '210.jpg';
    movie.PosterXL = posterUrl + '720.jpg';
    
    if (!rootState.watchedMovies.watchedMovies) {
      const ref = database().ref(`watchedMovies/${uid}`).push(movie);
      ref.set(movie);
      ref.update(movie);
      return commit('EMPTY_FOUND_MOVIES');
    }

    const alreadyAdded = Object.keys(rootState.watchedMovies.watchedMovies).filter(id =>
      rootState.watchedMovies.watchedMovies[id].imdbID === movie.imdbID);

    if (alreadyAdded.length) {
      const id = alreadyAdded[0];

      commit('EMPTY_FOUND_MOVIES');

      return dispatch('showToast', {
        title: 'Already Added!',
        message: `${rootState.watchedMovies.watchedMovies[id].Title} already added to watch movies.`
      });
    }

    const ref = database().ref(`watchedMovies/${uid}`).push(movie);
    ref.set(movie);
    ref.update(movie);
    commit('EMPTY_FOUND_MOVIES');
  },
  findMovies({ commit, dispatch }, movie) {
    if (!movie) {
      return;
    }

    axios
      .get('https://www.omdbapi.com', {
        params: {
          apikey: '7174c422',
          plot: 'full',
          t: movie.split(',')[0],
          y: movie.split(',')[1]
        }
      })
      .then(function (response) {
        if(response.data.Error) {
          dispatch('showToast', {
            title: 'Not Found',
            message: 'Movie could not be found.'
          });
          return;
        }

        let array = [];
        let posterUrl = response.data.Poster;
        let poster = posterUrl.substring(0, posterUrl.length - 7);
        response.data.Poster = poster + '140.jpg';
        array.push(response.data);

        commit('UPDATE_FOUND_MOVIES', array);
      });
  },
  emptyFoundMovies({ commit }) {
    commit('EMPTY_FOUND_MOVIES');
  },
  deleteMovie({ dispatch }, ref) {
    const uid = auth().currentUser.uid;
    const movie = database().ref(`watchedMovies/${uid}/${ref}`);

    movie.remove();

    dispatch('showToast', {
      title: 'Deleted',
      message: 'Movie Deleted'
    });
  },
  getMovieDetails({ commit }, ref) {
    const uid = auth().currentUser.uid;
    const movieDetails = database().ref(`watchedMovies/${uid}/${ref}`);

    movieDetails.on('value', snapshot => {
      commit('GET_MOVIE_DETAILS', snapshot.val());
    });
  }
};

const mutations = {
  [GET_WATCHED_MOVIES](state, snapshot) {
    state.watchedMovies = snapshot;
  },
  [GET_MOVIE_DETAILS](state, snapshot) {
    state.movieDetails = snapshot;
  },
  [UPDATE_FOUND_MOVIES](state, movies) {
    state.foundMovies = movies;
  },
  [EMPTY_FOUND_MOVIES](state) {
    state.foundMovies = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
