const express = require('express');
const addRequestId = require('express-request-id')();
// const helmet = require('helmet');
const compression = require('compression');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
const root = require('./root');
const { logger, requestLogger } = require('./logger');

const apiApp = ({logger, requestLogger}) => {
    const app = express();

    app.set('port', process.env.PORT || 3001);
    logger.info('WOOT');

    // app.use(helmet());
    app.use(addRequestId);
    app.use(compression());
    app.use(requestLogger);

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
      }));

    return app;
};

module.exports = apiApp({logger, requestLogger});
