import { Router } from "express";
import { retrieveUserData } from "../controllers/user.controller";
import { register, login } from "../controllers/auth.controller";
import validateParams from "../utilities/handleParamValidation";
import { isAuthenticated } from "../middleware/auth.middleware";

const prefix = "user";

export const userRoutes = (router: Router) => {
  router.get(`/${prefix}s/`, [isAuthenticated], retrieveUserData);
  router.post(`/register/${prefix}`, [validateParams("register")], register);
  router.post(`/login/${prefix}`, [validateParams("login")], login);
};
