import { Router } from "express";
import {
  deleteUserData,
  retrieveUserData,
  updateUserData,
} from "../controllers/user.controller";
import { register, login, logout } from "../controllers/auth.controller";
import validateParams from "../utilities/handleParamValidation";
import { isAuthenticated } from "../middleware/auth.middleware";

const namespace = "user";

export const userRoutes = (router: Router) => {
  router.get(`/${namespace}/`, [isAuthenticated], retrieveUserData);
  router.post(`/logout/${namespace}`, [isAuthenticated], logout);
  router.post(`/register/${namespace}`, [validateParams("register")], register);
  router.post(`/login/${namespace}`, [validateParams("login")], login);
  router.put(`/update/${namespace}`, [isAuthenticated], updateUserData);
  router.delete(`delete/${namespace}`, [isAuthenticated], deleteUserData);
};
