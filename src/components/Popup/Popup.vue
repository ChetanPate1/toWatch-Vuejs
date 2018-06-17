<template lang="html">
   <div class="popup-background" v-bind:class="{ 'open': popupOpen }" @click="close()">
      <div class="popup-content" @click.stop>
         <h4>{{ title }}</h4>
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
   props: {
      title: String,
      size: String
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
      top: 50%;
      left: 0;
      right: 0;
      display: block;
      max-width: 400px;
      margin: auto;
      width: 100%;
      height: auto;
      border-radius: 7px;
      padding: 70px 30px 20px 30px;
      background-color: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0 30px 65px -30px rgba(0, 0, 0, 0.3);
      transition: all 500ms ease;
      opacity: 0;
      -ms-transform: translate(0, -100%);
      transform: translate3d(0, -100%, 0);

      .close-button{
         position: absolute;
         top: 5px;
         right: 5px;
         background-color: transparent;
         line-height: 1;
         border: none;
         padding: 10px;
         font-size: 20px;
         opacity: 0.6;
         z-index: 5;

         &:hover{
            opacity: 1;
         }
      }
   }

   h4{
      font-weight: bold;
      margin: 0;
      position: absolute;
      z-index: 1;
      top: 20px;
      left: 35px;
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
         -ms-transform: translate(0, -50%);
         transform: translate3d(0, -50%, 0);
      }
   }
}
</style>
