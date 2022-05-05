import { UserRepository } from "../database/repositories/repository";
import { attemptQuery } from "../utilities/attemptQuery";
import bcryptjs from "bcryptjs";
import { User } from "../database/entities/user.entity";

interface IRegistrationCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const verifyUser = async (email: string) =>
  await attemptQuery(async () => {
    return await UserRepository.findOne({ where: { email: email } });
  });

export const registerUser = async (credentials: IRegistrationCredentials) =>
  await attemptQuery(async () => {
    const { firstName, lastName, email, password } = credentials;
    const { password: _, ...newUser } = await UserRepository.save({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcryptjs.hash(password, 10),
    });
    return newUser;
  });
