import { IUser, emptyUser } from "./user";
import { Thread, IThread } from "./thread";
export interface IMessage {
  id: number;
  type: string;
  content: string;
  sender: IUser; // Make a User type
  createdAt: string;
  thread: IThread; // Make a Thread type
}
export class Message {
  id: number = 0;
  type: string = "";
  content: string = "";
  sender: IUser = emptyUser();
  thread: Thread = new Thread();
}
