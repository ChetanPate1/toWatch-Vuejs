import Vue from 'vue';
import Router from 'vue-router';
import MostPopular from '@/components/MostPopular';
import Login from '@/components/Login';
import MyShows from '@/components/MyShows';
import WatchList from '@/components/WatchList';
import RewatchList from '@/components/RewatchList';

Vue.use(Router);

export default new Router({
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
      component: MyShows
    },
    {
      path: '/watch-list',
      name: 'watchList',
      component: WatchList
    },
    {
      path: '/rewatch-list',
      name: 'rewatchList',
      component: RewatchList
    },
    { path: '/', redirect: '/most-popular' }
  ]
});
