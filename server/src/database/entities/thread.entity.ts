import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Message } from "./message.entity";
import { Participant } from "./participant.entity";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToMany(() => User, (user) => user.threadParticipant)
  users: User[];

  @OneToMany(() => Participant, (participant) => participant.thread)
  participants: Participant[];

  @OneToMany(() => Message, (message) => message.thread, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  messages: Message[];
}
