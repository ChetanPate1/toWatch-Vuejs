<template lang="html">
   <div class="show-card" tabindex="0" v-bind:class="{ 'deleteable': deleteable }" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
      <button class="icon-button dripicons-trash" tabindex="0" @click.stop></button>
      <button class="icon-button dripicons-plus" tabindex="0" @click.stop></button>
      <h2>{{ heading }}</h2>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'ShowCard',
   data() {
      return {
         deleteOpen: false
      }
   },
   props: {
      heading: String,
      imgSrc: String,
      reference: String,
      deleteable: Boolean
   },
   methods: {
      deleteShow(){
         this.$store.dispatch('deleteShow', this.reference);
      }
   }
}
</script>

<style lang="scss">
.show-card{
   overflow: hidden;
   position: relative;
   display: block;
   margin: 0 auto 25px auto;
   max-width: 250px;
   height: 369px;
   background-color: #f8f8f8;
   border-radius: 8px;
   padding: 20px 15px 0 15px;
   background-position: center center;
   background-size: cover;
   background-repeat: no-repeat;
   box-shadow: inset 0 130px 130px rgba(0, 0, 0, 0.2), 0 20px 40px -10px rgba(0, 0, 0, 0.5);

   &.deleteable{
      &:hover{
         cursor: pointer;
      }

      &:focus{
         .icon-button{
            transform: translate(0, 0);
         }
      }
   }

   h2{
      font-size: 25px;
      letter-spacing: 1px;
      z-index: 10;
      font-weight: bold;
      position: relative;
      z-index: 10;
      color: #ffffff;
   }

   .dripicons-plus{
      right: 15px;
      top: 15px;
      transition: 250ms all ease;
      transform: translate(45px, 0);
   }

   .dripicons-trash{
      left: 15px;
      top: 15px;
      transition: 250ms all ease;
      transform: translate(-45px, 0);
   }

   .icon-button{
      z-index: 100;
      position: absolute;

      &:focus{
         transform: translate(0, 0);
      }
   }
}
</style>
