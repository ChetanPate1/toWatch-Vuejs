<template lang="html">
  <div class="progress-bar-container">
    <div class="progress" :style="{ 'width': `${percentage}%` }"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss">
.progress-bar-container {
  position: relative;
  height: 4px;
  width: 100%;
  border-radius: 2px;
  display: inline-block;
  overflow: hidden;
  background-color: transparentize($base-color, 0.5);

  .progress {
    background-color: $base-color;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 0;
    transition: 300ms width ease;
  }
}
</style>
