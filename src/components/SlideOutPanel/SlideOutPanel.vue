<template>
<div class="slide-out-panel" :class="{ 'open' : open }" >
   <slot></slot>
</div>
</template>

<script>
export default {
   name: 'SlideOutPanel',
   props: {
      open: Boolean
   }
}
</script>

<style src="./SlideOutPanel.scss" lang="scss"></style>
