<template>
<div>
  <div
    class="panel-row"
    :class="{ 'disabled' : !watched }"
  >
    <div class="col-35">
      <span class="aired-by">
        <i class="dripicons-feed"></i>
        {{ aired(released).by }}
      </span>
    </div>
    <div class="col-45">Episode {{ number }}</div>
    <div class="col-20" @click="$emit('click')">
      <span class="dripicons-preview" :class="{ 'active' : watched }"></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PanelRow',
  data() {
    return {
      timeNow: new Date().getTime()
    };
  },
  props: {
    watchingId: String,
    number: Number,
    watched: Boolean,
    released: String
  },
  methods: {
    aired(date) {
      date = new Date(date).getTime();
      let delta = Math.abs(date - this.timeNow) / 1000;
      let isAired = date - this.timeNow < 0;
      let aired = { isAired: isAired };

      if (isAired) {
        aired.by = `- ${Math.ceil(delta / 86400)} days`;
        if (Math.ceil(delta / 86400) > 30) {
          aired.by = 'aired';
        }
      } else {
        aired.by = 'not aired';
      }

      return aired;
    }
  }
};
</script>

<style src="./PanelRow.scss" lang="scss"></style>
