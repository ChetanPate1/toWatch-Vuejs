<template lang="html">
<div style="position: relative; overflow: hidden">
  <div class="toast" v-bind:class="{show: toast.show}">
    <h5>{{ toast.title }}</h5>
    <p>{{ toast.message }}</p>
  </div>
  <slot></slot>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Toast",
  computed: {
    ...mapGetters(["toast"])
  },
  methods: {
    dismiss() {
      this.$store.dispatch("toastDismiss");
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
