const express = require('express');
const addRequestId = require('express-request-id')();
// const helmet = require('helmet');
const compression = require('compression');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
const root = require('./root');

const apiApp = () => {
    const app = express();

    app.set('port', process.env.PORT || 3001);

    // app.use(helmet());
    app.use(addRequestId);
    app.use(compression());

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
      }));

    return app;
};

module.exports = apiApp();
