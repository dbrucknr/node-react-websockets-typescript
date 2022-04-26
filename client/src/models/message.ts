import { Thread } from "./thread";
import { User } from "./user";

export class Message {
  id: number = 0;
  type: string = "";
  content: string = "";
  sender: User = new User();
  thread: Thread = new Thread();
}
