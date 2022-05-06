import {
  Column,
  Entity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { Thread } from "./thread.entity";
import { User } from "./user.entity";

@Entity()
export class Message {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  content: string;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: "senderId" })
  sender: User;

  @CreateDateColumn()
  createdAt: string;

  @Index()
  @ManyToOne(() => Thread)
  @JoinColumn({ name: "threadId" })
  thread: Thread;
}
