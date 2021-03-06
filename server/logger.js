const { format, createLogger, transports } = require('winston');

const { combine, logstash, timestamp, json } = format;
const morgan = require('morgan');

const loggingTransports = [new transports.Console({ level: 'info' })];
const exceptionTransports = [new transports.Console({ level: 'info' })];

const logger = createLogger({
  level: 'debug',
  format: combine(timestamp(), json(), logstash()),
  transports: loggingTransports,
  exceptionHandlers: exceptionTransports,
  exitOnError: true,
});

logger.info('Logger mode: development');

module.exports = {
  logger,
  requestLogger: morgan('tiny', {
    stream: { write: message => logger.info(message) },
  }),
};
