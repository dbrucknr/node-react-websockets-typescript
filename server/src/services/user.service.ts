import { UserRepository } from "../database/repositories/repository";
import { attemptQuery } from "../utilities/attemptQuery";
import { Request } from "express";
import bcryptjs from "bcryptjs";

export const findUser = async (id: number) =>
  await attemptQuery(async () => {
    return await UserRepository.findOne({
      relations: {
        threads: {
          participants: {
            user: true,
          },
        },
        participant: true,
        messages: true,
      },
      where: {
        id,
      },
    });
  });

export const updateUser = async (currentUserId: number, req: Request) =>
  await attemptQuery(async () => {
    const { firstName, lastName, email, password } = req.body;
    return await UserRepository.update(currentUserId, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcryptjs.hash(password, 10),
    });
  });

// I may need to clear cookies / auth data after this process
export const deleteUser = async (id: number) =>
  await attemptQuery(async () => {
    return await UserRepository.delete(id);
  });
