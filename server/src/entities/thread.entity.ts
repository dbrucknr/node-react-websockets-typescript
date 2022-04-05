import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Message } from "./message.entity";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: "Participants",
    joinColumn: { name: "threadId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
  })
  participants: User[];

  @OneToMany(() => Message, (message) => message.thread, { eager: true })
  messages: Message[];
}
