import { Request, Response, NextFunction } from "express";
import { handler } from "../validation";

export default (validator: string) => {
  if (!handler[validator]) {
    throw new Error(`${validator} does not exist`);
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validParams = await handler[validator].validateAsync(req.body);
      next();
    } catch (error) {
      console.error(error);
      return next(res.status(422).send("Invalid Parameters"));
    }
  };
};
