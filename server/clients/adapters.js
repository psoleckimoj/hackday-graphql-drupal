const { map, path, prop, propOr, isEmpty, isNil } = require('ramda');

const HUB_CONTENT_TYPES = {
    moj_radio_item: 'radio',
    moj_pdf_item: 'pdf',
    moj_video_item: 'video',
    landing_page: 'landing-page',
    page: 'page',
    series: 'series',
    tags: 'tags',
};

const defaultThumbs = type => {
    const thumbs = {
        moj_radio_item: '/public/images/default_audio.png',
        moj_pdf_item: '/public/images/default_document.png',
        moj_video_item: '/public/images/default_video.png',
        page: '/public/images/default_document.png',
    };

    return thumbs[type] || thumbs.page;
};
  
const defaultAlt = type => {
    const alt = {
        moj_radio_item: 'Audio file',
        moj_pdf_item: 'Document file',
        moj_video_item: 'Video file',
        page: 'Document file',
    };

    return alt[type] || alt.page;
};

function imageFor(image) {
    return image
        ? {
            url: image.url,
            alt: image.alt,
        }
        : null;
}

function imageOrDefaultFor(image, contentType) {
    return image
        ? {
            url: image.url,
            alt: image.alt,
        }
        : {
            url: defaultThumbs(contentType),
            alt: defaultAlt(contentType),
        };
}

function typeFrom(type) {
    return HUB_CONTENT_TYPES[type];
}

function mediaResponseFrom(data) {
    return {
        episodeId: data.episode_id,
        programmeCode: data.programme_code,
        media: path(['media', 'url'], data),
        episode: data.episode,
        season: data.season,
        seriesId: data.series_id,
    };
}
  
function pdfResponseFrom(data) {
    return {
        media: path(['media', 'url'], data),
    };
}

function landingResponseFrom(data) {
    return {
        featuredContentId: data.featured_content_id,
        categoryId: data.category_id,
    };
}
  
function flatPageContentFrom(data) {
    return {
        standFirst: data.stand_first,
    };
}

function parseDrupalResponse(data) {
    const contentType = typeFrom(data.content_type);

    const defaults = {
        id: data.id,
        contentType,
        title: data.title,
        description: {
            raw: path(['description', 'value'], data),
            sanitized: path(['description', 'processed'], data),
            summary: path(['description', 'summary'], data),
        },
        thumbnail: imageOrDefaultFor(path(['image'], data)),
        establishmentIds: map(prop('target_id'), propOr([], 'prisons', data)),
        categories: map(prop('target_id'), propOr([], 'categories', data)),
        secondaryTags: map(
            prop('target_id'),
            propOr([], 'secondary_tags', data),
        ),
    };

    switch (contentType) {
        case 'page':
            return Object.assign(defaults, flatPageContentFrom(data));
        case 'video':
        case 'radio':
            defaults.media = mediaResponseFrom(data);

            return defaults;
        case 'landing-page':
            return Object.assign(defaults, landingResponseFrom(data));
        case 'pdf':
            defaults.media = pdfResponseFrom(data);

            return defaults;
        default:
            return null;
    };
}

const isResponseEmpty = val => isEmpty(val) || isNil(val);

module.exports = {
    parseDrupalResponse,
    isResponseEmpty,
};
