import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import { UserRepository } from "../database/repositories/repository";
import { findUser } from "../services/user.service";

export const retrieveUserData = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req["user"];
    const user = await findUser(id);

    return res.json({
      user,
    });
  });
