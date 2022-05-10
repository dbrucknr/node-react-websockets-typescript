import {
  // ParticipantRepository,
  ThreadRepository,
} from "../../repositories/repository";
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
        participants: [jennifer, derek],
        messages: [],
      })
    );
  } else {
    throw new Error("Jenny and Derek Thread Failed to Generate");
  }

  // const JennyAndDerek = await findThread(1);

  // Promise.resolve(
  //   await ParticipantRepository.save({
  //     thread: JennyAndDerek,
  //     user: jennifer,
  //   })
  // );

  // Promise.resolve(
  //   await ParticipantRepository.save({
  //     thread: JennyAndDerek,
  //     user: derek,
  //   })
  // );
};

export const saveBenAndDerek = async () => {
  const ben = await findUser("ben.fielstra@email.com");
  const derek = await findUser("derek.bruckner@email.com");

  // There's a bug when I try to save more than one participant
  // per user, ben's ID appears twice
  if (ben && derek) {
    console.log("Ben's ID", ben.id);
    console.log("Derek's ID", derek.id);

    Promise.resolve(
      await ThreadRepository.save({
        type: "standard",
        users: [ben, derek],
        participants: [ben, derek],
        messages: [],
      })
    );
  } else {
    throw new Error("Ben and Derek Thread Failed to Generate");
  }

  // const BenAndDerek = await findThread(2);

  // Promise.resolve(
  //   await ParticipantRepository.save({
  //     thread: BenAndDerek,
  //     user: ben,
  //   })
  // );

  // Promise.resolve(
  //   await ParticipantRepository.save({
  //     thread: BenAndDerek,
  //     user: derek,
  //   })
  // );
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
        participants: [chase, ben, greg],
        messages: [],
      })
    );
  } else {
    throw new Error("Group Thread Failed to Generate");
  }

  // const ChaseAndBenAndGreg = await findThread(3);

  // const secondParticipantList = [
  //   {
  //     thread: ChaseAndBenAndGreg,
  //     user: chase,
  //   },
  //   {
  //     thread: ChaseAndBenAndGreg,
  //     user: ben,
  //   },
  //   {
  //     thread: ChaseAndBenAndGreg,
  //     user: greg,
  //   },
  // ];

  // Promise.all(
  //   secondParticipantList.map(async (participant) => {
  //     await ParticipantRepository.save(participant);
  //   })
  // );
};

export const saveGregAndDerek = async () => {
  const derek = await findUser("derek.bruckner@email.com");
  const greg = await findUser("greg.white@email.com");

  if (greg && derek) {
    Promise.resolve(
      await ThreadRepository.save({
        type: "standard",
        users: [greg, derek],
        participants: [greg, derek],
        messages: [],
      })
    );
  } else {
    throw new Error("Greg and Derek Thread Failed to Generate");
  }

  // const GregAndDerek = await findThread(4);

  // Promise.resolve(
  //   await ParticipantRepository.save({
  //     thread: GregAndDerek,
  //     user: greg,
  //   })
  // );

  // Promise.resolve(
  //   await ParticipantRepository.save({
  //     thread: GregAndDerek,
  //     user: derek,
  //   })
  // );
};
