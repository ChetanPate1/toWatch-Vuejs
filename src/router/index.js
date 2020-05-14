import Vue from 'vue';
import Router from 'vue-router';
import MostPopular from '@/components/MostPopular';
import Login from '@/components/Login';
import MyShows from '@/components/MyShows';
import WatchList from '@/components/WatchList';
import RewatchList from '@/components/RewatchList';
import Watched from '@/components/Watched';
import WatchedMovies from '@/components/WatchedMovies';
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
      path: '/my-shows',
      name: 'myShows',
      component: MyShows,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/watch-list',
      name: 'watchList',
      component: WatchList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/rewatch-list',
      name: 'rewatchList',
      component: RewatchList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/watched',
      name: 'watched',
      component: Watched,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/watched-movies',
      name: 'watchedMovies',
      component: WatchedMovies,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie-details/:reference',
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
