class Media {
    constructor(mediaData) {
        this.mediaUrl = mediaData.media;
        this.mediaEpisode = mediaData.episode;
        this.mediaSeason = mediaData.season;
        this.mediaSeriesId = mediaData.seriesId;
        this.mediaEpisodeId = "";
        this.mediaDuration = "";
        this.mediaProgrammeCode = mediaData.programmeCode;
    }

    url() {
        return this.mediaUrl;
    }

    episode() {
        return this.mediaEpisode;
    }

    season() {
        return this.mediaSeason;
    }

    seriesId() {
        return this.mediaSeriesId;
    }

    episodeId() {
        return this.mediaEpisodeId;
    }

    duration() {
        return this.mediaDuration;
    }

    programmeCode() {
        return this.mediaProgrammeCode;
    }
}

module.exports = {
    Media,
};
