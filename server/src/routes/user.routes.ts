import { Router } from "express";
import { retrieveUserData } from "../controllers/user.controller";
import { register, login, logout } from "../controllers/auth.controller";
import validateParams from "../utilities/handleParamValidation";
import { isAuthenticated } from "../middleware/auth.middleware";

const prefix = "user";

export const userRoutes = (router: Router) => {
  router.get(`/${prefix}/`, [isAuthenticated], retrieveUserData);
  router.post(`/logout/${prefix}`, [isAuthenticated], logout);
  router.post(`/register/${prefix}`, [validateParams("register")], register);
  router.post(`/login/${prefix}`, [validateParams("login")], login);
};
