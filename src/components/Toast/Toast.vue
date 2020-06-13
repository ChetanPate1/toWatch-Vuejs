<template lang="html">
<div class="toast" :class="{ show }">
  <h5>{{ title }}</h5>
  <p>{{ message }}</p>
</div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    title: String,
    message: String,
    show: Boolean
  },
  methods: {
    dismiss() {
      this.$store.dispatch('toastDismiss');
    }
  }
};
</script>

<style lang="scss">
.toast {
  position: fixed;
  right: 15px;
  top: 120px;
  max-width: 300px;
  width: 100%;
  background-color: $base-color;
  padding: 20px;
  border-radius: 7px;
  z-index: 1000;
  transform: translate3d(120%, 0, 0) scale(0);
  opacity: 0;
  transition: all 400ms ease;

  h5,
  p {
    color: #fff;
    margin: 0;
  }

  h5 {
    margin-bottom: 5px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
  }

  &.show {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
</style>
