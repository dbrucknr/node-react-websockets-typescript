import { User } from "../database/entities/user.entity";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  participantsOnline: (onlineParticipantsIds: number[]) => void;
  online: (user: User) => void;
  offline: (user: User) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  join: (user: User) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
