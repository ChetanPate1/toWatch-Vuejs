<template>
  <button class="tab-button" type="button" name="button" :class="{ 'active' : active }" >{{ name }}</button>
</template>

<script>
  export default {
    name: 'TabButton',
    props: {
      name: String,
      active: Boolean
    }
  }
</script>

<style src="./TabButton.scss" lang="scss"></style>
