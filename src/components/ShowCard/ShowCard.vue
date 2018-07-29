<template lang="html">
<div>
   <popup :title="'Confirm'" :size="'md'" ref="confirmPopup">
      <h4 class="margin-top-0 margin-bottom-30">Are you sure you want to delete this show?</h4>

      <button class="button button-sm red pull-left"
              type="button"
              @click="$refs.confirmPopup.close('cancel')">Cancel
      </button>

      <button class="button button-sm pull-right"
              type="button"
              @click="$refs.confirmPopup.close('yes')">Yes
      </button>
   </popup>

   <div class="show-card" tabindex="0" v-bind:class="{ 'deleteable': deleteable }" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
      <button class="icon-button dripicons-trash" tabindex="0" @click.stop="confirmDelete()"></button>
      <button class="icon-button dripicons-plus" tabindex="0" @click.stop="$parent.$refs.popup.open()"></button>
      <h2>{{ heading }}</h2>
   </div>
</div>
</template>

<script>
import Popup from '../Popup/Popup';

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
      confirmDelete(){
         this.$refs.confirmPopup.open().then((result) => {
            if(result){
               this.$store.dispatch('deleteShow', this.reference);
            }
         });
      }
   },
   components: {
      Popup
   }
}
</script>

<style lang="scss">
.show-card{
   overflow: hidden;
   position: relative;
   display: block;
   margin: 0 auto 60px auto;
   max-width: 210px;
   height: 320px;
   border-radius: 0;
   padding: 20px 15px 0 15px;
   background-color: #000000;
   background-position: center center;
   background-size: cover;
   background-repeat: no-repeat;
   box-shadow: inset 0 130px 130px rgba(0, 0, 0, 0.2), 0 20px 40px -10px rgba(0, 0, 0, 0.7);

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
      font-size: 22px;
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
