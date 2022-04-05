import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";

export const retrieveUsersThreads = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Thread Data", request: req.body });
  });
