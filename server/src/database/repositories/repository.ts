import { User } from "../entities/user.entity";
import { Thread } from "../entities/thread.entity";
import { Message } from "../entities/message.entity";
import { database } from "../../config/database";

export const UserRepository = database.getRepository(User);
export const ThreadRepository = database.getRepository(Thread);
export const MessageRepository = database.getRepository(Message);
