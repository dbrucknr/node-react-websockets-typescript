import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import { UserRepository } from "../database/repositories/repository";

export const retrieveUserData = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req["user"];

    const userData = await UserRepository.findOne({
      relations: {
        threads: {
          participants: {
            user: true,
          },
        },
      },
      where: {
        id,
      },
    });

    return res.json({
      message: "User Data",
      user: userData,
    });
  });
