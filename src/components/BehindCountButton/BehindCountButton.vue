<template>
   <button class="more-button" type="button" name="more"
      :class="{ 'open' : open, 'up-to-date': behindCount == 0  }">
      <span class="dripicons-plus"></span>
      <span class="behind">{{ behindCount }}</span>
   </button>
</template>

<script>

export default {
   name: 'BehindCountButton',
   data(){
      return {
         now: new Date().getTime()
      }
   },
   props: {
      open: Boolean,
      seasons: Object
   },
   computed: {
      behindCount(){
         var count = 0;

         for (let season in this.seasons) {
            this.seasons[season].forEach((episode) => {
               if(!episode.watched && episode.airDate - this.now < 0){
                  count++;
               }
            });
         }

         return (count > 0) ? '-'+ count : count;
      }
   }
}
</script>
<style src="./BehindCountButton.scss" lang="scss"></style>
