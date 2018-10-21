import { objSize, dateToMs } from './helper-functions';

export function generateSeasons(show) {
    let episodes = show.episodes;
    let init = {};
    let size = objSize(episodes) - 1;
    let seasonNum = 1, j = 1, i = 0;
    let series = {};
    series.seasons = {};
    series.series = show.name;
    series.imgSrc = show.image_path;
    series.imgSrcSm = show.image_thumbnail_path;
    series.status = show.status;
    series.youtubeUrl = show.youtube_link;
    series.permalink = show.permalink;
    series.description = show.description;
    series.lastUpdated = new Date().getTime();

    init['season_' + seasonNum] = [];
    for (i; i <= size; i++) {
        init['season_' + seasonNum].push({
            name: episodes[i].name,
            number: episodes[i].episode,
            season: seasonNum,
            airDate: dateToMs(formatDate(episodes[i].air_date))
        });

        if (i > size - 1) {
            break;
        } else if (episodes[i + 1].season === seasonNum) {
            j++;
        } else {
            j = 1;
            seasonNum++;
            init['season_' + seasonNum] = [];
        }

        series.seasons = init;
    }

    return series;
}

export function initWatchlist(show, series) {
    let list = {
        lastUpdated: new Date().getTime(),
        upToDate: false,
        showId: series.seriesRef,
        on: {
            season: series.season,
            episode: series.episode,
            name: ''
        },
        unwatched: {}
    };

    let unwatched = show.seasons;
    let onSeasonKey = `season_${series.season}`;

    for (let season in unwatched) {
        unwatched[season].forEach((episode) => {
            let seasonNum = parseInt(season.split('_')[1]);
            episode.watched = false;

            if (seasonNum < series.season) {
                episode.watched = true;
            }
        });
    }

    unwatched[`season_${series.season}`].forEach((episode) => {
        if (episode.number < series.episode) {
            episode.watched = true;
        }
    });

    list.on.name = unwatched[`season_${series.season}`][series.episode - 1].name
    list['unwatched'] = unwatched;

    return list;
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