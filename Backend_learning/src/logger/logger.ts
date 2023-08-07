import winston = require ("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message, service }) => {
            return `[${timestamp}] ${service} ${level}: ${message}`;}
    ),),
    transports: [
        new winston.transports.File({ filename: "./src/logger/info.log", level: "info" }),
        new winston.transports.File({ filename: "./src/logger/error.log", level: "error" }),
        new winston.transports.File({ filename: "./src/logger/combined.log" }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "./src/logger/crash.log", level: "error" }),
    ],
});
export default logger;