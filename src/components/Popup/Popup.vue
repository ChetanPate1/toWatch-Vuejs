<template lang="html">
   <div class="popup-background" v-bind:class="{ 'open': popupOpen }" @click="close()">
      <div class="popup-content" @click.stop>
         <button class="close-button" @click.stop="close()" type="button">
            <span class="dripicons-cross"></span>
         </button>
         <slot></slot>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Popup',
   data(){
      return{
         popupOpen: false
      }
   },
   methods: {
      open(){
         this.popupOpen = true;
      },
      close(){
         this.popupOpen = false;
      }
   }
}
</script>

<style lang="scss">
.popup-background{
   position: fixed;
   top: 0;
   right: 0;
   z-index: 2000;
   background-color: transparentize(#000000, 0.8);
   width: 100%;
   height: 100%;
   transition: opacity 1000ms ease;
   -ms-transform: translate(100%, 0);
   transform: translate3d(100%, 0, 0);

   .popup-content{
      position: absolute;
      right: 0;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      display: block;
      min-width: 400px;
      min-height: 200px;
      border-radius: 7px;
      padding: 40px 30px 20px 30px;
      background-color: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0 30px 65px -30px rgba(0, 0, 0, 0.3);
      transition: all 500ms ease;
      opacity: 0;
      -ms-transform: translate(0, -50%);
      transform: translate3d(0, -50%, 0);

      .close-button{
         position: absolute;
         top: 10px;
         right: 10px;
         background-color: transparent;
         line-height: 1;
         border: none;
         padding: 10px;
         font-size: 20px;
         opacity: 0.6;

         &:hover{
            opacity: 1;
         }
      }
   }

   h3{
      font-weight: bold;
      margin-bottom: 30px;
      margin-top: 10px;
   }

   .button{
      margin-top: 20px;
      min-width: 50%;
      float: right;
   }

   &.open{
      opacity: 1;
      -ms-transform: translate(0, 0);
      transform: translate3d(0, 0, 0);

      .popup-content{
         opacity: 1;
         -ms-transform: translate(0, 0);
         transform: translate3d(0, 0, 0);
      }
   }
}
</style>
