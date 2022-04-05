import { Router } from "express";
import { messageThreadRoutes } from "./messageThread.routes";

const appRouteList = [messageThreadRoutes];

export const routes = (router: Router) =>
  appRouteList.forEach((section) => section(router));
