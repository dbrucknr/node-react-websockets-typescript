import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import {
  ThreadRepository,
  MessageRepository,
} from "../database/repositories/repository";
import { Thread } from "../database/entities/thread.entity";

export const createThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    return res.json({ message: "Create Thread", request: req.body });
  });

export const retrieveUsersThreads = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const user = req["user"];

    const userThreads = await ThreadRepository.createQueryBuilder("thread")
      .leftJoinAndSelect("thread.participants", "participant")
      .where("participant.id = :userId", { userId: user.id })
      .getMany();

    const threadsWithParticipants = await Promise.all(
      userThreads.map(
        async (thread) =>
          await ThreadRepository.findOne({
            relations: {
              participants: true,
            },
            where: {
              id: thread.id,
            },
          })
      )
    );

    return res.json({
      message: "Users Thread Data",
      threadsWithParticipants,
      userThreads,
      // threads: userThreads.map(({ participants, ...threads }) => {
      //   let usersWithoutPasswords = participants.map(
      //     ({ password, ...data }) => data
      //   );
      //   return {
      //     ...threads,
      //     participants: usersWithoutPasswords,
      //   };
      // }),
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
