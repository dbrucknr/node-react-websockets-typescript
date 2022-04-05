import {
  Column,
  Entity,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Thread } from "./thread.entity";
import { User } from "./user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  content: string;

  @OneToOne(() => User, (user) => user)
  sender: User;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Thread)
  @JoinColumn({ name: "threadId" })
  thread: Thread;
}
