import { IUser, emptyUser } from "./user";
import { IMessage } from "./message";
export interface IParticipant {
  id: number;
  thread: IThread;
  user: IUser;
}

export const emptyParticipant = () => {
  return {
    id: 0,
    thread: emptyThread(),
    user: emptyUser(),
  };
};
export interface IThread {
  id: number;
  type: string;
  users: IUser[];
  participants: IParticipant[];
  messages: IMessage[];
}

export const emptyThread = () => {
  return {
    id: 0,
    type: "",
    users: [],
    participants: [],
    messages: [],
  };
};

export class Thread {
  id: number = 0;
  type: string = "";
  users: IUser[] = [];
  participants: IParticipant[] = [];
  messages: IMessage[] = [];
}
