import { IUser, emptyUser } from "./user";
import { IThread, emptyThread } from "./thread";
export interface IMessage {
  id: number;
  type: string;
  content: string;
  sender: IUser;
  createdAt: string;
  thread: IThread;
}
export class Message {
  id: number = 0;
  type: string = "";
  content: string = "";
  sender: IUser = emptyUser();
  thread: IThread = emptyThread();
}
