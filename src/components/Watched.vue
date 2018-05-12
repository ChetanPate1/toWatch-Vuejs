<template lang="html">
   <no-content :message="noContentMessage" :condition="true"></no-content>
</template>

<script>
import NoContent from './NoContent/NoContent';

export default {
   name: 'Watched',
   data() {
      return {
         noContentMessage: 'You haven\'t watched any shows yet!'
      }
   },
   components: {
      NoContent
   }
}
</script>

<style lang="scss"></style>
