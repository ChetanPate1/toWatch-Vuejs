import { objSize, dateToMs } from './helperFunctions';

export default function generateSeasons(show) {
  let episodes = show.episodes;
  let init = {};
  let size = objSize(episodes) - 1;
  let seasonNum = 1, j = 1, i = 0;
  let series = {};
  series.seasons = [];
  series.series = show.name;
  series.imgSrc = show.image_path;
  series.imgSrcSm = show.image_thumbnail_path;
  series.status = show.status;
  series.lastUpdated = new Date().getTime();

  init['season_'+ seasonNum] = {};
  for (i; i <= size; i++) {
    init['season_'+ seasonNum][ j ] = {
      name: episodes[i].name,
      number: episodes[i].episode,
      airDate: dateToMs( episodes[i].air_date )
    };

    if(i > size - 1){
      break;
    }else if (episodes[i + 1].season === seasonNum) {
      j++;
    }else {
      j = 1;
      seasonNum++;
      init['season_'+ seasonNum] = {};
    }

    series.seasons = init;
  }

  return series;
}
