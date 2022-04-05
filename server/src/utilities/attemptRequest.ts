import { Request, Response } from "express";

export const attemptRequest = (
  req: Request,
  res: Response,
  fn: Function,
  ...args: any[]
) => {
  try {
    return fn(...args);
  } catch (error) {
    return res.status(500).send(`Server Error ${error}`);
  }
};
