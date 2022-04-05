import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";

export const retrieveUserData = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "User Data", request: req.body });
  });
