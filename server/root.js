const { DrupalClient } = require('./clients/drupal');
const {
    isResponseEmpty,
    parseDrupalResponse,
} = require('./clients/adapters');
const { ContentItem } = require('./types/contentItem');
const { logger } = require('./logger');

const root = {
    content: async ({id, prisonId}) => {
        const client = new DrupalClient();
        const endpoint = `${process.env.DRUPAL_API_ENDPOINT}/${id}`;

        if (!id) {
            logger.error(`Missing id for ${endpoint}`);
            return null;
        }

        const response = await client.get(endpoint, prisonId);

        if (isResponseEmpty(response)) {
            return null;
        }

        const content = parseDrupalResponse(response);
        return new ContentItem(content);
  }
};

module.exports = root;
