import {
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  Index,
} from "typeorm";
import { Thread } from "./thread.entity";
import { User } from "./user.entity";

@Entity()
export class Participant {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Thread, (thread) => thread.participants)
  @JoinColumn({ name: "threadId" })
  thread: Thread;

  @ManyToOne(() => User, (user) => user.threads)
  @JoinColumn({ name: "userId" })
  user: User;
}
