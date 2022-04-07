import { initializeDatabaseConnection } from "../../config/database";
import { UserRepository } from "../repositories/repository";
import bcryptjs from "bcryptjs";

export const seedExampleUsers = async () =>
  await initializeDatabaseConnection(async () => {
    const existingUserRecords = await UserRepository.find();
    if (existingUserRecords.length > 0) {
      await UserRepository.remove(existingUserRecords);
    }

    try {
      const firstDummyUser = await UserRepository.save({
        firstName: "Jennifer",
        lastName: "Godlew",
        email: "jennifer.godlew@email.com",
        password: await bcryptjs.hash("secret", 10),
      });

      const secondDummyUser = await UserRepository.save({
        firstName: "Derek",
        lastName: "Bruckner",
        email: "derek.bruckner@email.com",
        password: await bcryptjs.hash("secret", 10),
      });

      process.exit(0);
    } catch (error) {
      console.error("Error in user seeder:", error);
    }
  });
