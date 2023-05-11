import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import winston from "winston";
import morgan from "morgan";

const setupMiddlewares = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());

  // Log requests
  app.use(
    morgan("tiny", {
      stream: {
        write: (message) => winston.info(message.trim()),
      },
    })
  );
};

export default setupMiddlewares;
