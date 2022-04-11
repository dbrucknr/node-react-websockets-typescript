import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import {
  ThreadRepository,
  MessageRepository,
} from "../database/repositories/repository";

export const createThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Create Thread", request: req.body });
  });

export const retrieveUsersThreads = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req.params;
    const threads = await ThreadRepository.find({
      where: {
        id: parseInt(id),
      },
    });
    return res.json({
      message: "Users Thread Data",
      threads: threads.map(({ participants }) =>
        participants.map(({ password, ...data }) => data)
      ),
    });
  });

export const retrieveThreadMessages = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req.params;

    const messagesWithSender = await ThreadRepository.find({
      relations: {
        messages: {
          sender: true,
        },
      },
      where: {
        id: parseInt(id),
      },
    });

    const hidePassword = messagesWithSender.map((thread) =>
      thread.messages.map((message) => {
        delete message.sender.password;
      })
    );

    return res.json({
      message: "Thread Messages",
      messagesWithSender: messagesWithSender,
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
