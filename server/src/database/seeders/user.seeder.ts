import { UserRepository } from "../repositories/repository";
import { generateSampleUsers } from "./user.helpers";

export const seedExampleUsers = async () => {
  const existingUserRecords = await UserRepository.find();
  if (existingUserRecords.length > 0) {
    await UserRepository.remove(existingUserRecords);
  }

  try {
    const sampleUsers = await generateSampleUsers();

    await Promise.all(
      sampleUsers.map(async (user) => {
        await UserRepository.save(user);
      })
    );
  } catch (error) {
    console.error("Error in user seeder:", error);
  }
};
