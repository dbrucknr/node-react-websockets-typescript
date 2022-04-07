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

    // process.exit(0);
  } catch (error) {
    console.error("Error in message seeder:", error);
  }
};
