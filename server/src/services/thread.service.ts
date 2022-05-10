import { attemptQuery } from "../utilities/attemptQuery";
import { UserRepository } from "../database/repositories/repository";
import { ThreadRepository } from "../database/repositories/repository";

export const findThreads = async (id: number) =>
  await attemptQuery(async () => {
    return await UserRepository.find({
      relations: {
        threads: true,
      },
      where: {
        id: id,
      },
    });
  });

export const findThreadMessages = async (id: number) =>
  await attemptQuery(async () => {
    return await ThreadRepository.findOne({
      relations: {
        messages: {
          sender: true,
        },
      },
      where: {
        id,
      },
    });
  });

export const findSpecificThread = async (id: number) =>
  await attemptQuery(async () => {
    return await ThreadRepository.findOne({
      where: { id },
    });
  });

// TODO: Create an interface for params
// I think I'll need a participant, and the user
// trying to create the thread, but...maybe not
export const saveThread = async () =>
  await attemptQuery(async () => {
    // 1. Need selected Participant(s)
    // ?Could save initial thread with only the logged in user as owner?
    // Add participants through form / button?

    // I may need a "friend-list", or some sort of online user list
    // Select a user to start a message thread
    await ThreadRepository.save({
      type: "standard",
      users: [],
      participants: [],
      messages: [],
    });
  });

export const deleteThread = async (id: number) =>
  await attemptQuery(async () => {
    return await ThreadRepository.delete(id);
  });
