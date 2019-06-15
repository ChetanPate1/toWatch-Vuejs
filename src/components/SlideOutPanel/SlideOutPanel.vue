<template>
<div class="slide-out-panel" :class="{ 'open' : open }" >
   <slot></slot>
</div>
</template>

<script>
import Tabs from '../Tabs/Tabs';

export default {
   name: 'SlideOutPanel',
   props: {
      open: Boolean
   }
}
</script>

<style src="./SlideOutPanel.scss" lang="scss"></style>
