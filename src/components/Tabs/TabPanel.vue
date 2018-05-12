<template>
<div class="tab-panel" v-bind:style="{ 'left': position() }" :class="{ 'active' : active }" >
   <slot></slot>
</div>
</template>

<script>
export default {
   name: 'TabPanel',
   props: {
      active: Boolean,
      width: Number,
      number: Number
   },
   methods:{
      position(){
         return `${this.width * this.number}px`;
      }
   }
}
</script>

<style lang="scss">
.tab-panels{
   position: relative;
   width: 100%;
   display: block;
   overflow-y: auto;
   height: 365px;

   .tab-panel{
      z-index: 100;
      padding: 0;
      position: absolute;
      height: 100%;
      width: 357px;
      top: 0;
      left: 0;
      display: block;
      opacity: 0.5;
      transform: scale(0.9);
      transition: all 500ms ease;

      &.active{
         transform: scale(1);
         z-index: 200;
         opacity: 1;
      }
   }

   &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
   }
}

</style>
