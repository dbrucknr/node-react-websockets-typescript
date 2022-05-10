import bcryptjs from "bcryptjs";
import { UserRepository } from "../../repositories/repository";

export const generateSampleUsers = async () => {
  return Promise.all([
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
  ]);
};

export const findUser = async (email: string) =>
  await UserRepository.findOne({
    where: {
      email,
    },
  });
