import { User } from "../database/entities/user.entity";
import { UserRepository } from "../database/repositories/repository";
import { attemptQuery } from "../utilities/attemptQuery";
import { Request, Response } from "express";

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

export const updateUser = async (currentUserId: number, req: Request) =>
  await attemptQuery(async () => {
    return UserRepository.update(currentUserId, req.body);
  });

// I may need to clear cookies / auth data after this process
export const deleteUser = async (id: number) =>
  await attemptQuery(async () => {
    return await UserRepository.delete(id);
  });
