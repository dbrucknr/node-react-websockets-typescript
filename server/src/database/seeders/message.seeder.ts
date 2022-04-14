import {
  UserRepository,
  ThreadRepository,
  MessageRepository,
} from "../repositories/repository";

export const seedExampleMessages = async () => {
  try {
    const thread = await ThreadRepository.findOne({
      where: {
        id: 1,
      },
      relations: {
        participants: true,
      },
    });

    const jenny = await UserRepository.findOne({
      where: {
        email: "jennifer.godlew@email.com",
      },
    });

    const derek = await UserRepository.findOne({
      where: {
        email: "derek.bruckner@email.com",
      },
    });

    const sampleMessages = [
      {
        type: "standard",
        content: "Hello Derek",
        sender: jenny,
        thread: thread,
      },
      {
        type: "standard",
        content: "Hey Jenny",
        sender: derek,
        thread: thread,
      },
    ];
    await Promise.all(
      sampleMessages.map(async (message) => {
        await MessageRepository.save(message);
      })
    );

    // #########################################

    const secondThread = await ThreadRepository.findOne({
      where: {
        id: 2,
      },
      relations: {
        participants: true,
      },
    });

    const chase = await UserRepository.findOne({
      where: {
        email: "chase.pietrangelo@email.com",
      },
    });

    const ben = await UserRepository.findOne({
      where: {
        email: "ben.fielstra@email.com",
      },
    });

    const greg = await UserRepository.findOne({
      where: {
        email: "greg.white@email.com",
      },
    });

    const secondSampleMessages = [
      {
        type: "standard",
        content: "Sup guys",
        sender: chase,
        thread: secondThread,
      },
      {
        type: "standard",
        content: "Yooo",
        sender: greg,
        thread: secondThread,
      },
      {
        type: "standard",
        content: "hey there",
        sender: ben,
        thread: secondThread,
      },
    ];

    await Promise.all(
      secondSampleMessages.map(async (message) => {
        await MessageRepository.save(message);
      })
    );

    // process.exit(0);
  } catch (error) {
    console.error("Error in message seeder:", error);
  }
};
