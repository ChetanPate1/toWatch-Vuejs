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
   name: 'Tabs',
}
</script>

<style src="./Tabs.scss" lang="scss"></style>
