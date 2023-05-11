import winston from "winston";
import { format } from "winston";

const { combine, timestamp, printf } = format;

winston.error = (err: any) => {
  if (err instanceof Error) {
    return winston.log({ level: "error", message: `${err.stack || err}` });
  } else {
    return winston.log({ level: "error", message: err });
  }
};

const prodFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

export default function configureLogger() {
  if (process.env.NODE_ENV === "production") {
    winston.configure({
      levels,
      format: combine(timestamp(), prodFormat),
      transports: [
        new winston.transports.File({
          filename: `${process.env.LOG_PATH}/error.log`,
          level: "error",
        }),
        new winston.transports.File({
          filename: `${process.env.LOG_PATH}/combined.log`,
        }),
      ],
      exceptionHandlers: [
        new winston.transports.File({
          filename: `${process.env.LOG_PATH}/exceptions.log`,
          maxsize: 1000000,
        }),
      ],
      exitOnError: false, // <--- set this to false
    });
  } else {
    winston.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }
}
