<template>
   <div class="slide-out-panel" :class="{ 'open' : open }" >
      <tabs
      :seasons="unWatched"
      :current-tab="currentSeason"
      :current-episode="currentEpisode">
   </tabs>
</div>
</template>

<script>
import Tabs from '../Tabs/Tabs';

export default {
   name: 'SlideOutPanel',
   props: {
      open: Boolean,
      unWatched: Object,
      currentSeason: Number,
      currentEpisode: Number
   },
   components: {
      Tabs
   }
}
</script>

<style src="./SlideOutPanel.scss" lang="scss"></style>
