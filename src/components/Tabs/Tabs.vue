<template>
<div>
   <div class="tabs">
      <slot name="tab-buttons"></slot>
   </div>

   <div class="tab-panels">
      <slot name="tab-panels"></slot>
   </div>
</div>
</template>

<script>
export default {
   name: 'Tabs'
}
</script>

<style lang="scss">
.tabs{
   min-height: 70px;
   width: 90%;
   margin: auto;
   overflow-x: auto;

   .tab-button{
      width: 20%;
   }
}
</style>
