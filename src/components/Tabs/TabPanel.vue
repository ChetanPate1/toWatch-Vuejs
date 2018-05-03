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

<style src="./TabPanel.scss" lang="scss"></style>
