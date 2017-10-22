<template>
  <div>
    <nav class="navigation-bar" v-bind:class="{'open' : open }">
       <div class="container">
          <a class="brand"><strong>toWatch</strong></a>

          <ul class="links margin-top-xs-40">
             <router-link :to="{ path: '/most-popular'}" tag="li"><a><span class="dripicons-star"></span> MOST POPULAR</a></router-link>
             <router-link :to="{ path: '/rewatch-list'}" tag="li" v-if="userSignedIn"><a><span class="dripicons-clockwise"></span> REWATCH LIST</a></router-link>
             <router-link :to="{ path: '/watch-list'}" tag="li" v-if="userSignedIn"><a><span class="dripicons-preview"></span> WATCH LIST</a></router-link>
             <router-link :to="{ path: '/my-shows'}" tag="li" v-if="userSignedIn"><a><span class="dripicons-monitor"></span>MY SHOWS</a></router-link>
          </ul>
       </div>
       <ul class="links auth">
          <router-link :to="{ path: '/login'}" tag="li" v-if="!userSignedIn"><a>SIGNIN</a></router-link>
          <li v-if="userSignedIn"><a @click="logout" href>SIGNOUT</a></li>
       </ul>
    </nav>
    <button class="navigation-button" type="button" name="button" @click="toggleOpen">MENU</button>
    <div class="navigation-underlay" v-bind:class="{'open' : open }" @click="toggleOpen"></div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    userSignedIn() {

    },
    logout() {
      
    }
  }
}
</script>

<style lang="scss" src="./NavigationBar.scss"></style>
