const qs = require('qs');
const { baseClient } = require('./base');

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
        console.log(`Requested ${endpoint}?${qs.stringify(newQuery)}`);

        return res.data;
      })
      .catch(exp => {
        console.log(`Failed to request ${endpoint}?${qs.stringify(newQuery)}`);
        console.log(exp);
        return null;
      });
  }
}

module.exports = {
    DrupalClient,
};
