import { IUser, emptyUser } from "./user";
import { IMessage } from "./message";
import { StatusOptions } from "../state/utilities/actionMapper";
export interface IParticipant {
  id: number;
  thread: IThread;
  status: StatusOptions;
}

export const emptyParticipant = (): IParticipant => {
  return {
    id: 0,
    thread: emptyThread(),
    status: StatusOptions.OFFLINE,
  };
};
export interface IThread {
  id: number;
  type: string;
  users: IUser[];
  messages: IMessage[];
}

export const emptyThread = (): IThread => {
  return {
    id: 0,
    type: "",
    users: [],
    messages: [],
  };
};

export class Thread {
  id: number = 0;
  type: string = "";
  users: IUser[] = [];
  messages: IMessage[] = [];

  constructor(props: IThread) {
    Object.assign(this, props);
  }

  get participantCount() {
    return this.users.length;
  }

  get messageCount() {
    return this.messages.length;
  }
}
