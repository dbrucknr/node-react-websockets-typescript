import { ThreadRepository } from "../../repositories/repository";
import { findUser } from "../user.helpers";

export const findThread = async (id: number, participants: boolean = false) =>
  await ThreadRepository.findOne({
    where: {
      id,
    },
  });

export const saveJennyAndDerek = async () => {
  const jennifer = await findUser("jennifer.godlew@email.com");
  const derek = await findUser("derek.bruckner@email.com");

  if (jennifer && derek) {
    Promise.resolve(
      await ThreadRepository.save({
        type: "standard",
        users: [jennifer, derek],
        messages: [],
      })
    );
  } else {
    throw new Error("Jenny and Derek Thread Failed to Generate");
  }
};

export const saveBenAndDerek = async () => {
  const ben = await findUser("ben.fielstra@email.com");
  const derek = await findUser("derek.bruckner@email.com");

  if (ben && derek) {
    Promise.resolve(
      await ThreadRepository.save({
        type: "standard",
        users: [ben, derek],
        messages: [],
      })
    );
  } else {
    throw new Error("Ben and Derek Thread Failed to Generate");
  }
};

export const saveChaseBenAndGreg = async () => {
  const chase = await findUser("chase.pietrangelo@email.com");
  const ben = await findUser("ben.fielstra@email.com");
  const greg = await findUser("greg.white@email.com");

  if (chase && ben && greg) {
    Promise.resolve(
      await ThreadRepository.save({
        type: "group",
        users: [chase, ben, greg],
        messages: [],
      })
    );
  } else {
    throw new Error("Group Thread Failed to Generate");
  }
};

export const saveGregAndDerek = async () => {
  const derek = await findUser("derek.bruckner@email.com");
  const greg = await findUser("greg.white@email.com");

  if (greg && derek) {
    Promise.resolve(
      await ThreadRepository.save({
        type: "standard",
        users: [greg, derek],
        messages: [],
      })
    );
  } else {
    throw new Error("Greg and Derek Thread Failed to Generate");
  }
};
