import { ThreadRepository } from "../repositories/repository";

export const findThread = async (id: number, participants: boolean = false) =>
  await ThreadRepository.findOne({
    where: {
      id,
    },
    relations: {
      participants,
    },
  });
