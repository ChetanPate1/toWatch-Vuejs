<template>
  <div class="tab-panel" :class="{ 'active' : active }" >
    <panel-row
      :season="content"
      :current-season="currentSeason"
      :current-episode="currentEpisode">
    </panel-row>
  </div>
</template>

<script>
  import PanelRow from './PanelRow';

  export default {
    name: 'TabPanel',
    props: {
      active: Boolean,
      content: Array,
      currentSeason: String,
      currentEpisode: Number
    },
    components: {
      PanelRow
    }
  }
</script>

<style src="./TabPanel.scss" lang="scss"></style>
