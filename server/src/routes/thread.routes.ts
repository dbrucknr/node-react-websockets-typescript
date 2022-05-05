import { Router } from "express";
import {
  retrieveUsersThreads,
  retrieveThreadMessages,
  retrieveSpecificThread,
} from "../controllers/thread.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const prefix = "thread";

export const threadRoutes = (router: Router) => {
  router.get(`/${prefix}s/`, [isAuthenticated], retrieveUsersThreads);
  router.get(
    `/${prefix}/messages/:id`,
    [isAuthenticated],
    retrieveThreadMessages
  );
  router.get(`/${prefix}/:id`, [isAuthenticated], retrieveSpecificThread);
};
