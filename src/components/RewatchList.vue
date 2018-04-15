<template lang="html">
   <no-content :message="noContentMessage" :condition="true"></no-content>
</template>

<script>
import NoContent from './NoContent/NoContent';

export default {
   name: 'RewatchList',
   data() {
      return {
         noContentMessage: 'Your rewatch list is empty!'
      }
   },
   components: {
      NoContent
   }
}
</script>

<style lang="css">
</style>
