import { Router } from "express";
import {
  retrieveUsersThreads,
  retrieveThreadMessages,
} from "../controllers/thread.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const prefix = "thread";

export const threadRoutes = (router: Router) => {
  router.get(`/${prefix}s/`, [isAuthenticated], retrieveUsersThreads);
  router.get(`/${prefix}/messages/:id`, retrieveThreadMessages);
};
