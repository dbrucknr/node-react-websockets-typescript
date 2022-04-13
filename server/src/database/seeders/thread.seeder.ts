import {
  UserRepository,
  ThreadRepository,
  ParticipantRepository,
} from "../repositories/repository";

export const seedExampleThreads = async () => {
  try {
    let threadParticipants = [];
    const findJennifer = await UserRepository.findOne({
      where: {
        email: "jennifer.godlew@email.com",
      },
    });

    threadParticipants.push(findJennifer);

    const findDerek = await UserRepository.findOne({
      where: {
        email: "derek.bruckner@email.com",
      },
    });

    threadParticipants.push(findDerek);

    if (threadParticipants.length == 2) {
      Promise.resolve(
        await ThreadRepository.save({
          type: "standard",
          // participants: threadParticipants,
          // messages: [],
        })
      );
      const thread = await ThreadRepository.findOne({
        where: {
          id: 1,
        },
      });

      Promise.resolve(
        await ParticipantRepository.save({
          thread: thread,
          user: findJennifer,
        })
      );

      Promise.resolve(
        await ParticipantRepository.save({
          thread: thread,
          user: findDerek,
        })
      );
    }
  } catch (error) {
    console.error("Error in thread seeder:", error);
  }
};
