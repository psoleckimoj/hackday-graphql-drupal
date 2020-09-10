const { buildSchema } = require('graphql');

const contentItemSchema = `
    type Media {
        url: String!
        episodeId: String
        seriesId: Int
        season: Int
        episode: Int
        duration: String
        programmeCode: String
    }
    type Establishment {
        id: Int!
        name: String!
    }
    type Category {
        id: Int!
        name: String!
    }
    type ContentItem {
        id: Int!
        contentType: String!
        title: String!
        standFirst: String
        description: String
        descriptionProcessed: String
        summary: String
        thumbnail: String
        media: Media
        categories: [Category!]!
        secondaryTags: [Category!]!
        establishments: [Establishment!]!
    }
    type Query {
        content(id: Int!, prisonId: Int): ContentItem
    }`;

module.exports = buildSchema(contentItemSchema);
