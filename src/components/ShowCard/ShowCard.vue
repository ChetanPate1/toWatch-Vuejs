<template lang="html">
   <div class="show-card" v-bind:class="{ 'deleteable': deleteable }" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
      <h2>{{ heading }}</h2>

      <div class="shutter-delete" v-bind:class="{'open' : deleteOpen }">
         <h2>Delete from My Shows?</h2>
         <div class="col-xs-6">
            <button type="button" name="cancel" class="button" @click="deleteOpen = !deleteOpen">cancel</button>
         </div>
         <div class="col-xs-6">
            <button type="button" name="delete" class="button red" @click="deleteShow()">delete</button>
         </div>
      </div>
      <button class="button red delete-button" type="button" @click="deleteOpen = !deleteOpen">Delete</button>
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

   h2{
      font-size: 25px;
      letter-spacing: 1px;
      z-index: 10;
      font-weight: bold;
      position: relative;
      color: #ffffff;
   }

   .delete-button{
      z-index: 100;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 15px;
      width: 90%;
      margin: auto;

      &.red{
         background-color: $danger-color;
         color: #ffffff;
      }

      transform: translate(0, 100px);
   }

   &.deleteable{
      &:focus, &:hover{
         .delete-button{
            transform: translate(0, 0);
         }
      }
   }
}

.show-card{
   overflow: hidden;

   .shutter-delete{
      z-index: 500;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      opacity: 0;

      h2{
         text-align: center;
         width: 100%;
         position: absolute;
         top: 100px;
         left: 0;
      }

      .button{
         margin: 210px auto 0 auto;
         display: block;
         max-width: 100px;
      }

      transform: translate(0, -115%);
      transition: all 300ms ease;

      &.open{
         transform: translate(0, 0);
         opacity: 1;
      }
   }
}
</style>
