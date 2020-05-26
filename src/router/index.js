import Vue from 'vue';
import Router from 'vue-router';
import MostPopular from '@/components/MostPopular';
import Login from '@/components/Login';
import ShowCollection from '@/components/ShowCollection';
import Watching from '@/components/Watching';
import WatchedShows from '@/components/WatchedShows';
import MovieCollection from '@/components/MovieCollection';
import MovieDetails from '@/components/MovieDetails';

import Store from '../store';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/most-popular',
      name: 'mostPopular',
      component: MostPopular
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/show-collection',
      name: 'showCollection',
      component: ShowCollection,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/watching',
      name: 'watching',
      component: Watching,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/watched-shows',
      name: 'watchedShows',
      component: WatchedShows,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie-collection',
      name: 'movieCollection',
      component: MovieCollection,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie-details/:movieId',
      name: 'movieDetails',
      component: MovieDetails,
      meta: {
        requiresAuth: true
      }
    },
    { path: '/', redirect: '/most-popular' }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!getToken()) {
      Store.dispatch('auth/signUserOut');
    }
    
    next();
  } else {
    next();
  }
});

const getToken = () => {
  const token = localStorage.getItem('token');

  if (!token || token == 'null') {
    return null;
  }
  
  return token;
};

export default router;
