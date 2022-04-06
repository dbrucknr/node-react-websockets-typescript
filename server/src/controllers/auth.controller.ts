import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import { registrationSchema } from "../validation/registration.validation";

export const register = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { error } = registrationSchema.validate(req.body);
    console.log(error);
    return res.json({ message: "Register Logic", request: req.body });
  });
