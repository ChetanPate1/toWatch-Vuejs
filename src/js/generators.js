import axios from 'axios';

const apikey = process.env.VUE_APP_OMDB_API_KEY;

export async function generateSeasons(show) {
  const total = parseInt(show.totalSeasons)
  const seasonArray = [...Array(total).keys()];
  const promises = seasonArray.map(value => (
    axios.get('https://www.omdbapi.com', {
      params: { apikey, i: show.imdbID, season: value + 1 }
    })
  ));

  const responses = await Promise.all(promises);
  const episodes = [];
  responses.map((res, index) => {
    if (res.data.Response == 'True') {
      episodes.push({
        season: index + 1,
        episodes: res.data.Episodes.map(item => {
          return {
            ...item, Episode: parseInt(item.Episode)
          };
        })
      });
    }
  });

  return { ...show, episodes };
}

export function initWatchlist(show, series) {
  return {
    showId: series.seriesRef,
    on: nextEpisode(show, series),
    unwatched: show.episodes.map(season => {
      return {
        ...season,
        episodes: season.episodes.map(item => {
          if (season.season < series.season) {
            return { ...item, watched: true };
          }

          if (season.season == series.season && item.Episode <= series.episode) {
            return { ...item, watched: true };
          }

          return { ...item, watched: false };
        })
      };
    })
  };
}

function nextEpisode(show, series) {
  const currentSeason = show.episodes.filter(s => s.season === series.season);
  const nextSeason = show.episodes.filter(s => s.season === series.season + 1);
  let next = currentSeason[0].episodes.filter(item => item.Episode === series.episode + 1);
  let season = series.season;

  if (!next.length && !nextSeason.length) {
    season = currentSeason[0].season;
    next = currentSeason[0].episodes.filter(item => item.Episode === series.episode);
  }

  if (!next.length) {
    season = nextSeason[0].season;
    next = nextSeason[0].episodes.filter(item => item.Episode === 1);
  }

  return {
    season,
    episode: next[0].Episode,
    name: next[0].Title
  };
}

export function initRewatchlist(show) {
  let series = {
    episode: 1,
    season: 1
  };

  return initWatchlist(show, series);
}
