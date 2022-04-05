import { Router } from "express";
import { threadRoutes } from "./thread.routes";
import { userRoutes } from "./user.routes";

const appRouteList = [threadRoutes, userRoutes];

export const routes = (router: Router) =>
  appRouteList.forEach((section) => section(router));
