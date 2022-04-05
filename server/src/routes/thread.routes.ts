import { Router } from "express";
import { retrieveUsersThreads } from "../controllers/thread.controller";

const prefix = "thread";

export const threadRoutes = (router: Router) => {
  router.get(`/${prefix}s/`, retrieveUsersThreads);
};
