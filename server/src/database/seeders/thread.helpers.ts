import { ThreadRepository } from "../repositories/repository";

export const findThread = async (id: number) =>
  await ThreadRepository.findOne({
    where: {
      id,
    },
  });
