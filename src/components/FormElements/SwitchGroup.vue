<template lang="html">
<div class="switch-group" :class="{ dark }">
  <div class="switch-group-item"
    v-for="item in options"
    :key="item.id"
    :class="{ active: item.label == model }"
    :style="{ width: `${100/options.length}%` }">
    <label :for="item.label">
      <input type="radio"
        :id="item.label"
        :name="item.label"
        :value="model"
        :checked="item.label == model"
        @input="$emit('input', item.label); model = item.label" />
        {{ item.label }}
    </label>
  </div>
</div>
</template>

<script>
export default {
  name: 'SwitchGroup',
  props: {
    dark: Boolean,
    value: String,
    options: Array
  },
  data() {
    return {
      model: this.value
    };
  },
  create() {
    this.model = this.value;
  },
  watch: {
    value(newValue) {
      this.model = newValue;
    }
  }
};
</script>

<style lang="scss">
.switch-group {
  display: inline-block;
  width: 100%;
  border: 1px solid #ccc8c8;
  border-radius: 5px;

  > .switch-group-item {
    position: relative;
    float: left;
    width: 100%;
    text-align: center;
    color: $base-color;

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
    }

    > label {
      display: block;
      padding: 6px;
      margin: 3px;
      border-radius: 3px;
    }

    &.active {
      > label {
        background-color: $base-color;
        color: #fff;
      }
    }
  }

  &.dark {
    border: 1px solid $base-color;
  }
}
</style>
