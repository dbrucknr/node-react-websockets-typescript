import { attemptQuery } from "../utilities/attemptQuery";
import { UserRepository } from "../database/repositories/repository";
import { ThreadRepository } from "../database/repositories/repository";

export const findThreads = async (id: number) =>
  await attemptQuery(async () => {
    return await UserRepository.find({
      relations: {
        threads: {
          participants: {
            user: true,
          },
        },
      },
      where: {
        id: id,
      },
    });
  });

export const findThreadMessages = async (id: number) =>
  await attemptQuery(async () => {
    return await ThreadRepository.find({
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
