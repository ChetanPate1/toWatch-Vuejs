<template>
<div>
  <div class="panel-row" :class="{ 'disabled' : !watched }">
    <div class="col-25">
      <span class="aired-by">
        <i class="dripicons-feed"></i>
        {{ aired(released).by }}
      </span>
    </div>

    <div class="col-60">
      <div class="title">
        <small>Episode {{ number }}<br /></small>
        {{ title ? title : '-' }}
      </div>
    </div>

    <div class="col-15" @click="$emit('click')">
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
    title: String,
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

<style src="./panel-row.scss" lang="scss"></style>
