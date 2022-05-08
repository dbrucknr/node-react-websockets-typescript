import { Router, Request, Response } from "express";
import { threadRoutes } from "./thread.routes";
import { userRoutes } from "./user.routes";

const appHealth = (router: Router) => {
  router.get("/health-check", (req: Request, res: Response) => {
    res.status(200).send("Health Check");
  });
};

const appRouteList = [appHealth, threadRoutes, userRoutes];

export const routes = (router: Router) =>
  appRouteList.forEach((section) => section(router));
