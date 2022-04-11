import { verify } from "jsonwebtoken";
import { UserRepository } from "../database/repositories/repository";
import { Request, Response, NextFunction } from "express";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.cookies["jwt-messenger"];
  //   const token = authHeader && authHeader.split(" ")[1];

  //   if (!token) {
  //     return res
  //       .status(401)
  //       .send({ status: "Failed Auth Status", message: "Missing Token" });
  //   }

  verify(authHeader, "secret", (error, user) => {
    console.log("verify", user);
    return error
      ? res.status(401).send({
          status: "Failed Token Verify",
          message: "Cannot verify token",
        })
      : (req["user"] = user);
  });
  next();
};
