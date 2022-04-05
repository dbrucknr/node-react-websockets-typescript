import { Router } from "express";
import { retrieveUserData } from "../controllers/user.controller";

const prefix = "user";

export const userRoutes = (router: Router) => {
  router.get(`/${prefix}s/`, retrieveUserData);
};
