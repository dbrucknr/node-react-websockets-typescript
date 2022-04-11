import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";

export const retrieveUserData = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const checkCookieProcess = req["user"];
    return res.json({
      message: "User Data",
      request: req.body,
      cookie: checkCookieProcess,
    });
  });
