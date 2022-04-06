import { Router } from "express";
import { retrieveUserData } from "../controllers/user.controller";
import { register } from "../controllers/auth.controller";
import validateParams from "../utilities/handleParamValidation";

const prefix = "user";

export const userRoutes = (router: Router) => {
  router.get(`/${prefix}s/`, retrieveUserData);
  router.post(`/register/${prefix}`, [validateParams("register")], register);
};
