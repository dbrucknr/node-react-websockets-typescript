import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";

export const getUsersMessageThreads = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Data", request: req.body });
  });
