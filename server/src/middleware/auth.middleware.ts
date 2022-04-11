import { verify } from "jsonwebtoken";
import { UserRepository } from "../database/repositories/repository";
import { Request, Response, NextFunction } from "express";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.cookies["jwt-messenger"];

    if (!authHeader) {
      return res
        .status(401)
        .send({ status: "Failed Auth Status", message: "Unauthenticated" });
    }

    verify(authHeader, "secret", (error, user) => {
      console.log("verify", user);
      return error
        ? res.status(401).send({
            status: "Failed Token Verify",
            message: "Cannot verify token",
          })
        : (req["user"] = user);
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "Error", message: "Failed to verify auth status" });
  }
  next();
};
