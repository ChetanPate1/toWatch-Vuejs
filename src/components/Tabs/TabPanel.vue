<template>
<div class="tab-panel" :class="{ 'active' : active }" >
   <slot></slot>
</div>
</template>

<script>
export default {
   name: 'TabPanel',
   props: {
      active: Boolean
   }
}
</script>

<style lang="scss">
.tab-panels{
   position: relative;
   width: 100%;
   display: block;
   overflow-y: auto;
   height: 360px;

   .tab-panel{
      z-index: 100;
      padding: 0;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      display: block;
      transform: translate(-100%, 0);
      transition: all 400ms ease;

      &.active{
         z-index: 200;
         opacity: 1;
         transform: translate(0, 0);
      }
   }

   &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
   }
}

</style>
