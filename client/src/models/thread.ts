import { IMessage, IParticipant, IUser } from "../state/types/state";

export class Thread {
  id: number = 0;
  type: string = "";
  users: IUser[] = [];
  participants: IParticipant[] = [];
  messages: IMessage[] = [];
}
