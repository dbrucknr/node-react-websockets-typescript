import { Router } from "express";
import {
  retrieveUsersThreads,
  retrieveThreadMessages,
} from "../controllers/thread.controller";

const prefix = "thread";

export const threadRoutes = (router: Router) => {
  router.get(`/${prefix}s/:id`, retrieveUsersThreads);
  router.get(`/${prefix}/messages/:id`, retrieveThreadMessages);
};
