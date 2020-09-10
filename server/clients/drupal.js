const qs = require('qs');
const { baseClient } = require('./base');
const { logger } = require('../logger');

class DrupalClient {
  constructor(client = baseClient) {
    this.client = client;
  }

  get(endpoint, prisonId, { query, ...rest } = {}) {
    const newQuery = {
      _format: 'json',
      _lang: 'en',
      _prison: prisonId,
      ...query,
    };
    return this.client
      .get(endpoint, { params: newQuery, ...rest })
      .then(res => {
        logger.info(`DrupalClient requested ${endpoint}?${qs.stringify(newQuery)}`);

        return res.data;
      })
      .catch(exp => {
        logger.error(`DrupalClient failed to request ${endpoint}?${qs.stringify(newQuery)}`);
        logger.info(exp);
        return null;
      });
  }
}

module.exports = {
    DrupalClient,
};
