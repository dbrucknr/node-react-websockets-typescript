import { IParticipant, IThread } from "./thread";
import { StatusOptions } from "../state/utilities/actionMapper";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  threads: IThread[];
  threadParticipant: IParticipant[];
  status: StatusOptions;
}

export const emptyUser = (): IUser => {
  return {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    threads: [],
    threadParticipant: [],
    status: StatusOptions.OFFLINE,
  };
};
export class User {
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  threads: IThread[] = [];
  threadParticipant: IParticipant[] = [];
  status: StatusOptions = StatusOptions.OFFLINE;

  constructor(props: IUser) {
    Object.assign(this, props);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get threadCount() {
    return this.threads.length;
  }
}
