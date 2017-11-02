<template lang="html">
  <no-content :message="noContentMessage" :condition="true"></no-content>
</template>

<script>
import NoContent from './NoContent/NoContent';

export default {
  name: 'WatchList',
  data() {
    return {
      noContentMessage: 'Your watch list is empty!'
    }
  },
  components: {
    NoContent
  }
}
</script>

<style lang="css">
</style>
