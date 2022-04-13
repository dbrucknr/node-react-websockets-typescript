import {
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Thread } from "./thread.entity";
import { User } from "./user.entity";

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Thread, (thread) => thread.participants)
  @JoinColumn({ name: "threadId" })
  thread: Thread;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  user: User;
}
