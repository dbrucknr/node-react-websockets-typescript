import { Request, Response } from "express";
import { attemptRequest } from "../utilities/attemptRequest";
import { UserRepository } from "../database/repositories/repository";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";

export const register = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await UserRepository.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(401).send({
        status: "Registration failed.",
        message: "User already exists with this email",
      });
    }

    const { password: _, ...newUser } = await UserRepository.save({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcryptjs.hash(password, 10),
    });
    return res.send({
      status: "Success",
      message: "Registration succeeded",
      user: newUser,
    });
  });

export const login = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    const { email, password } = req.body;
    const user = await UserRepository.findOne({ where: { email: email } });
    console.log(user);
    if (user) {
      const validatePassword = await bcryptjs.compare(password, user.password);
      const token = validatePassword && sign({ id: user.id }, "secret");
      return res
        .cookie("jwt-messenger", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .send({ message: "Success" });
    }

    return res.status(400).send("Invalid Login Attempt");
  });

export const logout = async (req: Request, res: Response) =>
  await attemptRequest(req, res, async () => {
    res.cookie("jwt-messenger", "", { maxAge: 0 });
    return res.send({ status: "Success", message: "Logout successful" });
  });
