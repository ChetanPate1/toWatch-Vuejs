<template>
   <div>
      <nav class="navigation-bar" v-bind:class="{'open' : open }">
         <div class="container">
            <a class="brand"><strong>toWatch</strong></a>
            <ul class="links margin-top-xs-40">
               <router-link :to="{ path: '/most-popular'}" tag="li" v-if="!user.isLoggedIn"><a><span class="dripicons-star"></span> MOST POPULAR</a></router-link>
               <router-link :to="{ path: '/watched-movies'}" tag="li" v-if="user.isLoggedIn"><a><span class="dripicons-preview"></span> WATCHED MOVIES</a></router-link>
               <router-link :to="{ path: '/watched'}" tag="li" v-if="user.isLoggedIn"><a><span class="dripicons-preview"></span> WATCHED</a></router-link>
               <router-link :to="{ path: '/rewatch-list'}" tag="li" v-if="user.isLoggedIn"><a><span class="dripicons-clockwise"></span> REWATCH LIST</a></router-link>
               <router-link :to="{ path: '/watch-list'}" tag="li" v-if="user.isLoggedIn"><a><span class="dripicons-preview"></span> WATCH LIST</a></router-link>
               <router-link :to="{ path: '/my-shows'}" tag="li" v-if="user.isLoggedIn"><a><span class="dripicons-monitor"></span>MY SHOWS</a></router-link>

               <li ref="dropdownMenu" class="menu-container" v-bind:class="{ 'open' : dropdown }">
                  <a href @click.prevent="dropdown = !dropdown"><span class="dripicons-user"></span> Me</a>
                  <ul class="menu">
                     <li><a @click.prevent="logout" href><span class="dripicons-exit"></span> SIGNOUT</a></li>
                  </ul>
               </li>
            </ul>
         </div>
         <ul class="links auth">
            <router-link :to="{ path: '/login'}" tag="li" v-if="!user.isLoggedIn"><a>SIGNIN</a></router-link>
         </ul>
      </nav>
      <button class="navigation-button" type="button" name="button" @click="toggleOpen">MENU</button>
      <div class="navigation-underlay" v-bind:class="{'open' : open }" @click="toggleOpen"></div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'NavigationBar',
   data() {
      return {
         open: false,
         dropdown: false
      }
   },
   computed: {
      ...mapActions([
         'getCurrentUser',
         'signUserOut'
      ]),
      ...mapGetters([
         'user'
      ])
   },
   beforeMount(){
      this.$store.dispatch('getCurrentUser');
   },
   created () {
      document.addEventListener('click', this.toggleDropdown);
   },
   destroyed () {
      document.removeEventListener('click', this.toggleDropdown);
   },
   methods: {
      toggleOpen() {
         this.open = !this.open;
      },
      toggleDropdown(e){
         let el = this.$refs.dropdownMenu;
         let target = e.target;

         if ( el !== target && !el.contains(target)) {
           this.dropdown = false;
         }
      },
      logout(){
         this.$store.dispatch('signUserOut');
      }
   }

}
</script>

<style lang="scss" src="./NavigationBar.scss"></style>
