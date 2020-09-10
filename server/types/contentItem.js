const { Category } = require('./category');
const { Media } = require('./media');
const { Establishment } = require('./establishment');

class ContentItem {
    constructor(content) {
        this.contentItemId = content.id;
        this.contentItemType = content.contentType;
        this.contentItemTitle = content.title;
        this.contentItemDescription = content.description.raw;
        this.contentItemDescriptionProcessed = content.description.sanitized;
        this.contentItemSummary = content.description.summary;
        this.contentItemThumbnail = content.thumbnail;
        this.contentItemStandFirst = content.standFirst;
        this.contentItemCategoryId = content.categoryId;
        this.contentItemFeaturedContentId = content.featuredContentId;
        this.contentItemEstablishments = [];
        this.contentItemCategories = [];
        this.contentItemSecondaryTags = [];

        this.contentItemEstablishments = content.establishmentIds.map((establishmentId) => {
            return new Establishment({id: establishmentId, name: ''});
        });

        this.contentItemCategories = content.categories.map((categoryId) => {
            return new Category({id: categoryId, name: ''});
        });

        this.contentItemSecondaryTags = content.secondaryTags.map((secondaryTagId) => {
            return new Category({id: secondaryTagId, name: ''});
        });

        this.contentItemMedia = content.media? new Media(content.media) : null;
    }

    id() {
        return this.contentItemId;
    }

    contentType() {
        return this.contentItemType;
    }

    title() {
        return this.contentItemTitle;
    }

    standFirst() {
        return this.contentItemStandFirst;
    }

    description() {
        return this.contentItemDescription;
    }

    descriptionProcessed() {
        return this.contentItemDescriptionProcessed;
    }

    summary() {
        return this.contentItemSummary;
    }

    thumbnail() {
        return this.contentItemThumbnail;
    }

    featuredContentId() {
        return this.contentItemFeaturedContentId;
    }

    categoryId() {
        return this.contentItemCategoryId;
    }

    categories() {
        return this.contentItemCategories;
    }

    secondaryTags() {
        return this.contentItemSecondaryTags;
    }

    establishments() {
        return this.contentItemEstablishments;
    }

    media() {
        return this.contentItemMedia;
    }
}

module.exports = {
    ContentItem,
};
