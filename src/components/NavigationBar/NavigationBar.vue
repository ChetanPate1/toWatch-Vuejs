<template>
  <div>
    <nav class="navigation-bar" v-bind:class="{'open' : open }">
      <div class="container">
        <a class="brand">
          <strong>toWatch</strong>
        </a>
        <ul class="links margin-top-xs-40">
          <router-link :to="{ path: '/most-popular'}" tag="li"  v-if="!token">
            <a @click="open =false">
              <span class="dripicons-star"></span> MOST POPULAR
            </a>
          </router-link>
          <router-link :to="{ path: '/movie-collection'}" tag="li" v-if="token">
            <a>
              <span class="dripicons-camcorder"></span> MOVIE COLLECTION
            </a>
          </router-link>
          <router-link :to="{ path: '/watched-shows'}" tag="li" v-if="token">
            <a>
              <span class="dripicons-preview"></span> WATCHED SHOWS
            </a>
          </router-link>
          <router-link :to="{ path: '/watching'}" tag="li" v-if="token">
            <a>
              <span class="dripicons-preview"></span> WATCHING
            </a>
          </router-link>
        </ul>
      </div>
      <ul class="links auth">
        <router-link :to="{ path: '/login'}" tag="li" v-if="!token">
          <a>SIGNIN</a>
        </router-link>
        <a v-if="token" @click.prevent="logout" href>SIGNOUT</a>
      </ul>
    </nav>
    <button class="navigation-button" type="button" name="button" @click="toggleOpen">
      <span class="dripicons-menu"></span>
    </button>
    <div class="navigation-underlay" :class="{'open' : open }" @click="toggleOpen"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavigationBar',
  data() {
    return {
      open: false,
      dropdown: false
    };
  },
  computed: {
    ...mapState({
      token: ({ storage }) => storage.token,
      user: ({ storage }) => storage.user
    })
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    logout() {
      this.$store.dispatch('auth/signUserOut');
      this.open = false;
    }
  }
};
</script>

<style lang="scss" src="./NavigationBar.scss"></style>
