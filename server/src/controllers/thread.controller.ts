import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import {
  // ParticipantRepository,
  ThreadRepository,
  UserRepository,
} from "../database/repositories/repository";
import {
  findSpecificThread,
  findThreadMessages,
  findThreads,
} from "../services/thread.service";
import { User } from "../database/entities/user.entity";

export const createThread = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { id } = req["user"];

    const threadCreator = await UserRepository.findOne({ where: { id } });
    console.log(threadCreator);

    // Pass as an array of ID's
    const { selectedParticipants } = <{ selectedParticipants: number[] }>(
      req.body
    );

    console.log("selectedParticipants", selectedParticipants);

    // Is this process necessary? Can I pass an array of ID's to
    // ThreadRepository's participants?
    let participants: User[] = [];
    for (let id of selectedParticipants) {
      const foundParticipant = await UserRepository.findOne({ where: { id } });
      participants = [...participants, foundParticipant];
    }
    participants = [...participants, threadCreator];
    console.log("#######################################");

    console.log(participants);

    console.log("#######################################");

    const thread = await ThreadRepository.save({
      type: "standard",
      users: participants,
      participants: participants,
      messages: [],
    });

    return res.json({ message: "Create Thread", request: req.body, thread });
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
