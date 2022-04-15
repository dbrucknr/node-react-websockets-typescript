import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import {
  ThreadRepository,
  MessageRepository,
  UserRepository,
} from "../database/repositories/repository";

export const createThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Create Thread", request: req.body });
  });

export const retrieveUsersThreads = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const user = req["user"];
    const threads = await UserRepository.find({
      relations: {
        threads: {
          participants: {
            user: true,
          },
        },
      },
      where: {
        id: user.id,
      },
    });

    return res.json({
      message: "Users Thread Data",
      threads,
    });
  });

export const retrieveThreadMessages = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req.params;

    const threadMessages = await ThreadRepository.find({
      relations: {
        messages: {
          sender: true,
        },
      },
      where: {
        id: parseInt(id),
      },
    });

    return res.json({
      message: "Thread Messages",
      threadMessages,
    });
  });

export const updateThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Update Thread", request: req.body });
  });

export const deleteThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Delete Thread", request: req.body });
  });
