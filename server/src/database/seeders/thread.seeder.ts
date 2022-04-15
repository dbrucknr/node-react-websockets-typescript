import {
  ThreadRepository,
  ParticipantRepository,
} from "../repositories/repository";
import { findUser } from "./user.helpers";
import { findThread } from "./thread.helpers";
export const seedExampleThreads = async () => {
  try {
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
      throw new Error("Standard Thread Failed to Generate");
    }
    const JennyAndDerek = await findThread(1);

    Promise.resolve(
      await ParticipantRepository.save({
        thread: JennyAndDerek,
        user: jennifer,
      })
    );

    Promise.resolve(
      await ParticipantRepository.save({
        thread: JennyAndDerek,
        user: derek,
      })
    );

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

    const ChaseAndBenAndGreg = await findThread(2);

    const secondParticipantList = [
      {
        thread: ChaseAndBenAndGreg,
        user: chase,
      },
      {
        thread: ChaseAndBenAndGreg,
        user: ben,
      },
      {
        thread: ChaseAndBenAndGreg,
        user: greg,
      },
    ];

    Promise.all(
      secondParticipantList.map(async (participant) => {
        await ParticipantRepository.save(participant);
      })
    );
  } catch (error) {
    console.error("Error in thread seeder:", error);
  }
};
