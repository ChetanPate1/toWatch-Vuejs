<template lang="html">
  <div class="container-fluid fade-in">
    <div class="row show-layout">
        <div class="col-xs-6 col-sm-3 col-md-2" v-for="(show, key) in limit(mostPopularShows, 18)">
          <show-card
          :heading="show.name"
          :img-src="show.image_thumbnail_path"
          :deleteable="false"
          :key="key">
        </show-card>
    </div>
  </div>
</div>
</template>

<script>
import ShowCard from "./ShowCard/ShowCard";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MostPopular",
  computed: {
    ...mapActions(["getMostPopularShows"]),
    ...mapGetters(["mostPopularShows"])
  },
  mounted() {
    this.$store.dispatch("getMostPopularShows");
  },
  methods: {
    limit(array, limit) {
      return array.slice(0, limit);
    }
  },
  components: {
    ShowCard
  }
};
</script>
