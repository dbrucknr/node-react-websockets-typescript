import { IUser, emptyUser } from "./user";
import { IMessage } from "./message";
import { StatusOptions } from "../state/utilities/actionMapper";
export interface IParticipant {
  id: number;
  thread: IThread;
  user: IUser;
  status: StatusOptions;
}

export const emptyParticipant = (): IParticipant => {
  return {
    id: 0,
    thread: emptyThread(),
    user: emptyUser(),
    status: StatusOptions.OFFLINE,
  };
};
export interface IThread {
  id: number;
  type: string;
  users: IUser[];
  participants: IParticipant[];
  messages: IMessage[];
}

export const emptyThread = (): IThread => {
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

  constructor(props: IThread) {
    Object.assign(this, props);
  }

  get participantCount() {
    return this.participants.length;
  }

  get messageCount() {
    return this.messages.length;
  }
}
