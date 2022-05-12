import { attemptQuery } from "../utilities/attemptQuery";
import { UserRepository } from "../database/repositories/repository";
import { ThreadRepository } from "../database/repositories/repository";
import { User } from "../database/entities/user.entity";
import { Equal, In } from "typeorm";

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

export const saveThread = async (participantIDs: number[]) =>
  await attemptQuery(async () => {
    let participants: User[] = [];
    for (let id of participantIDs) {
      const foundParticipant = await UserRepository.findOne({ where: { id } });
      participants = [...participants, foundParticipant];
    }
    // const existingThread = await checkForExistingThread(participants);
    // console.log("In saveThread:", existingThread);

    // return await ThreadRepository.save({
    //   type: "standard",
    //   users: participants,
    //   messages: [],
    // });
  });

export const deleteThread = async (id: number) =>
  await attemptQuery(async () => {
    return await ThreadRepository.delete(id);
  });

export const checkForExistingThread = async (
  creatorID: number,
  selectedParticipantIDs: number[]
) =>
  await attemptQuery(async () => {
    // Does this handle Group types?
    console.log(selectedParticipantIDs);

    const arrayOfExistingThreadUsers = await ThreadRepository.query(`
    WITH participant_master
    AS (SELECT "userId", "threadId",
       array_agg("userId") OVER(PARTITION BY "threadId") participants
    FROM participant)
    SELECT CASE WHEN
            participant_master.participants::INTEGER[] = ARRAY[${selectedParticipantIDs}]::INTEGER[]
                THEN true ELSE false
        END
    FROM participant_master
        WHERE "userId" = ${creatorID};
    `);

    console.log("test result", arrayOfExistingThreadUsers);

    if (arrayOfExistingThreadUsers.length > 1) {
      return true;
    }
    return false;
  });
