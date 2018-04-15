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
import PanelRow from '../Panel/PanelRow';

export default {
   name: 'TabPanel',
   props: {
      active: Boolean,
      content: Array,
      currentSeason: String,
      currentEpisode: String
   },
   components: {
      PanelRow
   }
}
</script>

<style src="./TabPanel.scss" lang="scss"></style>
