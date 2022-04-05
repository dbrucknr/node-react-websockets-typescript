import { Router } from "express";
import { getUsersMessageThreads } from "../controllers/messageThread.controller";
const prefix = "thread";

export const messageThreadRoutes = (router: Router) => {
  router.get(`/${prefix}s/`, getUsersMessageThreads);
};
