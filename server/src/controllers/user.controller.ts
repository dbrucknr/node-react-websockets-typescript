import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import { deleteUser, findUser, updateUser } from "../services/user.service";

export const retrieveUserData = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req["user"];
    const user = await findUser(id);

    return res.json({ user });
  });

export const updateUserData = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    // const { id } = req["user"];
    const { affected } = await updateUser(3, req);
    if (affected > 0) {
      return res.status(204).send("Success");
    }
    return res.status(500).send("Failed to update");
  });

export const deleteUserData = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req["user"];
    const { affected } = await deleteUser(id);
    if (affected > 0) {
      return res.status(200).send("Success");
    }
    return res.status(500).send("Failed to delete");
  });
