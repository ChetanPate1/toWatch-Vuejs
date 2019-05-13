<template>
  <button
    class="more-button"
    type="button"
    name="more"
    :class="{ 'open' : open, 'up-to-date': behindCount == 0  }"
  >
    <span class="dripicons-plus"></span>
    <span class="behind">{{ behindCount }}</span>
  </button>
</template>

<script>
export default {
  name: "BehindCountButton",
  data() {
    return {
      now: new Date().getTime()
    };
  },
  props: {
    open: Boolean,
    seasons: Array
  },
  computed: {
    behindCount() {
      var count = 0;
      console.log(this.seasons);

      for (let season in this.seasons) {
        this.seasons[season].episodes.forEach(episode => {
          if (!episode.watched) {
            count++;
          }
        });
      }

      return count > 0 ? "-" + count : count;
    }
  }
};
</script>
<style src="./BehindCountButton.scss" lang="scss"></style>
