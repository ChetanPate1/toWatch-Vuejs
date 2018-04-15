<template>
   <div>
      <behind-count-button @click.native="toggleOpen()"
      :un-watched="seasons"
      :current-season="currentSeason" :open="open">
   </behind-count-button>

   <slide-out-panel
   :un-watched="seasons"
   :current-season="currentSeason"
   :current-episode="currentEpisode"
   :open="open" >
</slide-out-panel>
</div>
</template>

<script>
import BehindCountButton from '../BehindCountButton/BehindCountButton';
import SlideOutPanel from '../SlideOutPanel/SlideOutPanel';

export default {
   name: 'MorePanel',
   props: {
      seasons: Object,
      currentSeason: String,
      currentEpisode: String
   },
   data() {
      return {
         open: false
      }
   },
   methods: {
      toggleOpen(){
         this.open = !this.open;
      }
   },
   components: {
      BehindCountButton,
      SlideOutPanel
   }

}
</script>
