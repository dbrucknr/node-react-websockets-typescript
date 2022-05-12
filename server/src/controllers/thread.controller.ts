import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import {
  checkForExistingThread,
  findSpecificThread,
  findThreadMessages,
  findThreads,
  saveThread,
} from "../services/thread.service";

export const createThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req["user"];
    // Pass as an array of ID's
    const { selectedParticipants } = <{ selectedParticipants: number[] }>(
      req.body
    );
    const type = selectedParticipants.length > 2 ? "group" : "standard";
    const existingThread = await checkForExistingThread(
      id,
      selectedParticipants
    );
    if (existingThread) {
      return res.status(409).json({
        message: `You already have a thread with the selected ${type}`,
      });
    }

    const userIDs = selectedParticipants.concat(id);
    const thread = await saveThread(userIDs);
    return res.json({ thread });
  });

export const retrieveUsersThreads = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req["user"];
    const threads = await findThreads(id);
    return res.json({
      threads,
    });
  });

export const retrieveThreadMessages = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req.params;
    const threadMessages = await findThreadMessages(parseInt(id));

    return res.json({
      threadMessages,
    });
  });

export const retrieveSpecificThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req.params;
    const thread = await findSpecificThread(parseInt(id));
    return res.json({ thread });
  });

export const updateThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Update Thread", request: req.body });
  });

export const deleteThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Delete Thread", request: req.body });
  });
