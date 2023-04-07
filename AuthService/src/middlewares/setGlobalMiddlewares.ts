import * as express from "express";
import * as morgan from "morgan";
import corsMiddleware from "./cors";
import limiter from "./rateLimit";
import sessionMiddleware from "./expressSession";



export const setGlobalMiddlewares = (app: express.Express): express.Express => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(corsMiddleware);
  app.use(sessionMiddleware);
  app.use(limiter);
  return app;
};
