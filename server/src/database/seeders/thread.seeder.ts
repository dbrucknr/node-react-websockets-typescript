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
          users: [findJennifer, findDerek],
          participants: threadParticipants,
          messages: [],
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

      let secondThreadParticipants = [];
      const findChase = await UserRepository.findOne({
        where: {
          email: "chase.pietrangelo@email.com",
        },
      });
      secondThreadParticipants.push(findChase);
      const findBen = await UserRepository.findOne({
        where: {
          email: "ben.fielstra@email.com",
        },
      });
      secondThreadParticipants.push(findBen);
      const findGreg = await UserRepository.findOne({
        where: {
          email: "greg.white@email.com",
        },
      });
      secondThreadParticipants.push(findGreg);

      if (secondThreadParticipants.length == 3) {
        Promise.resolve(
          await ThreadRepository.save({
            type: "group",
            users: [findChase, findBen, findGreg],
            participants: secondThreadParticipants,
            messages: [],
          })
        );
      }

      const secondThread = await ThreadRepository.findOne({
        where: {
          id: 2,
        },
      });

      Promise.resolve(
        await ParticipantRepository.save({
          thread: secondThread,
          user: findChase,
        })
      );

      Promise.resolve(
        await ParticipantRepository.save({
          thread: secondThread,
          user: findBen,
        })
      );

      Promise.resolve(
        await ParticipantRepository.save({
          thread: secondThread,
          user: findGreg,
        })
      );
    }
  } catch (error) {
    console.error("Error in thread seeder:", error);
  }
};
