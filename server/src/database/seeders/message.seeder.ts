import { MessageRepository } from "../repositories/repository";
import { findThread } from "./threads/thread.helpers";
import { findUser } from "./users/user.helpers";

export const seedExampleMessages = async () => {
  try {
    const thread = await findThread(1);

    const jennifer = await findUser("jennifer.godlew@email.com");
    const derek = await findUser("derek.bruckner@email.com");

    const sampleMessages = [
      {
        type: "standard",
        content: "Heya D-Bruck",
        sender: jennifer,
        thread: thread,
      },
      {
        type: "standard",
        content: "Sup J-God",
        sender: derek,
        thread: thread,
      },
    ];
    await Promise.all(
      sampleMessages.map(async (message) => {
        await MessageRepository.save(message);
      })
    );

    const secondThread = await findThread(2);

    const chase = await findUser("chase.pietrangelo@email.com");
    const ben = await findUser("ben.fielstra@email.com");
    const greg = await findUser("greg.white@email.com");

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
  } catch (error) {
    console.error("Error in message seeder:", error);
  }
};
