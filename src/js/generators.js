import { objSize, dateToMs } from './helper-functions';
import axios from 'axios';

const apikey = '7174c422';

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
    on: {
      season: series.season,
      episode: series.episode,
      name: show.episodes[series.season - 1].episodes[series.episode - 1].Title
    },
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

export function initRewatchlist(show) {
  let series = {
    episode: 1,
    season: 1
  };

  return initWatchlist(show, series);
}

function formatDate(date) {
  return date.split(' ')[0];
}
