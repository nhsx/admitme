const winston = require("winston");
const { v4: uuid } = require("uuid");

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  defaultMeta: { service: "product;ist", correlationId: uuid() },
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.Console({
      level: "error",
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

exports.logger = logger;
