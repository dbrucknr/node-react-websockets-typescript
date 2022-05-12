import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { User } from "./user.entity";
import { Message } from "./message.entity";

@Entity()
export class Thread {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToMany(() => User, (user) => user.threads)
  users: User[];

  @OneToMany(() => Message, (message) => message.thread, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  messages: Message[];
}
