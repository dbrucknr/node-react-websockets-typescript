import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import { ThreadRepository } from "../database/repositories/repository";
import {
  findSpecificThread,
  findThreadMessages,
  findThreads,
} from "../services/thread.service";

export const createThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { threadCreator } = req["user"];
    // Assumes no group...
    const { threadParticipants } = req.body;

    const thread = await ThreadRepository.save({
      type: "standard",
      participants: [],
      messages: [],
    });
    return res.json({ message: "Create Thread", request: req.body });
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
