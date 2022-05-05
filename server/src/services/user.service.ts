import { UserRepository } from "../database/repositories/repository";
import { attemptQuery } from "../utilities/attemptQuery";

export const findUser = async (id: number) =>
  await attemptQuery(async () => {
    return await UserRepository.findOne({
      relations: {
        threads: {
          participants: {
            user: true,
          },
        },
      },
      where: {
        id,
      },
    });
  });
