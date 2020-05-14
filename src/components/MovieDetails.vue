<template lang="html">
<div class="container-fluid">
  <div class="poster-xl-bg-container">
    <div class="container fade-in">
        <div class="row">
          <div class="col-xs-12">
              <div class="movie-details">
                <div class="col-sm-12">
                  <h1>{{ movieDetails.Title }} <span class="runtime">{{ movieDetails.Runtime }}</span> <span class="year">{{ movieDetails.Year }}</span></h1>
                  <h4 class="genre">{{ movieDetails.Genre }}</h4>
                </div>

                <div class="col-sm-6 col-md-5">
                  <p>{{ movieDetails.Plot }}</p>
                </div>
              </div>
          </div>
        </div>

        <div class="row ratings margin-top-50">
          <div class="col-xs-4" v-for="item in movieDetails.Ratings">
              <div class="rating">
                <p>{{ item.Source }}</p>
                <h4>{{ item.Value }}</h4>
              </div>
          </div>
        </div>
    </div>
    <div class="poster-gradient"></div>
    <img class="poster-background" v-bind:class="{ 'enter' : showPoster }" v-bind:src="movieDetails.PosterXL" />
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MoviesDetails',
  data() {
    return {
      showPoster: false
    };
  },
  computed: {
    ...mapGetters(['movieDetails']),
    ...mapActions(['getMovieDetails'])
  },
  mounted() {
    this.$store.dispatch('getMovieDetails', this.$route.params.reference);

    setTimeout(() => {
      this.showPoster = true;
    }, 1000);
  },
  components: {}
};
</script>

<style lang="scss">
.poster-gradient {
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    content: '';
    background: linear-gradient(
      to top,
      $body-color 40%,
      rgba(255, 255, 255, 0) 100%
    );
}

.poster-xl-bg-container {
  position: relative;
  min-height: 1270px;
  width: 100%;
  z-index: 100;

  .container{
    position: relative;
    z-index: 100;
  }

  .poster-background {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    max-width: 720px;
    opacity: 0;
    transform: translate3d(0, 50px, 0);
    transition: all ease 1800ms;

    &.enter {
      opacity: 0.3;
      transform: translate3d(0, 0, 0);
    }
  }

  .movie-details {
    margin-top: 100px;

    h1 {
      color: #ffffff;
      max-width: 22ch;

      .year {
        position: relative;
        display: inline;
        font-size: 12px;
        padding: 3px 10px;
        text-align: center;
        border: 1px solid #ffffff;
        border-radius: 3px;
        font-weight: 100;
        top: -5px;
      }

      .runtime {
        font-size: 12px;
        margin-right: 5px;
      }
    }

    h4 {
      color: #4a4a4a;
    }

    h5 {
      color: $base-color;
    }

    p {
      font-size: 16px;
      color: #e0e0e0;
      line-height: 1.8;
    }


    .genre{
      color: $base-color;
    }
  }


  .ratings {
    position: relative;
    color: #ffffff;

    .rating {
      h4 {
        font-weight: bold;
      }
    }
  }
}

</style>
