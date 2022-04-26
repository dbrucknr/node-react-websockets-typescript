export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  threads: any[];
  threadParticipant: any[];
}

export interface IMessage {
  id: number;
  type: string;
  content: string;
  sender: IUser; // Make a User type
  createdAt: string;
  thread: IThread; // Make a Thread type
}

export interface IThread {
  id: number;
  type: string;
  users: IUser[];
  participants: IParticipant[];
  messages: IMessage[];
}

export interface IParticipant {
  id: number;
  thread: IThread;
  user: IUser;
}
