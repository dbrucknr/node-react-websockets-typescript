import { UserRepository } from "../repositories/repository";
import bcryptjs from "bcryptjs";

export const seedExampleUsers = async () => {
  const existingUserRecords = await UserRepository.find();
  if (existingUserRecords.length > 0) {
    await UserRepository.remove(existingUserRecords);
  }

  try {
    const sampleUsers = [
      {
        firstName: "Jennifer",
        lastName: "Godlew",
        email: "jennifer.godlew@email.com",
        password: await bcryptjs.hash("secret", 10),
        threads: [],
      },
      {
        firstName: "Derek",
        lastName: "Bruckner",
        email: "derek.bruckner@email.com",
        password: await bcryptjs.hash("secret", 10),
      },
      {
        firstName: "Chase",
        lastName: "Pietrangelo",
        email: "chase.pietrangelo@email.com",
        password: await bcryptjs.hash("secret", 10),
      },
      {
        firstName: "Ben",
        lastName: "Fielstra",
        email: "ben.fielstra@email.com",
        password: await bcryptjs.hash("secret", 10),
      },
      {
        firstName: "Greg",
        lastName: "White",
        email: "greg.white@email.com",
        password: await bcryptjs.hash("secret", 10),
      },
      {
        firstName: "Mark",
        lastName: "Godlew",
        email: "mark.godlew@email.com",
        password: await bcryptjs.hash("secret", 10),
      },
    ];

    await Promise.all(
      sampleUsers.map(async (user) => {
        await UserRepository.save(user);
      })
    );
  } catch (error) {
    console.error("Error in user seeder:", error);
  }
};
