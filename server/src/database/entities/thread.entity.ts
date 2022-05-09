import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";
import { Message } from "./message.entity";
import { Participant } from "./participant.entity";

@Entity()
export class Thread {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // I'm wondering if this field is necessary - can probably remove. Check user model for relationship "threadParticipant"
  @ManyToMany(() => User, (user) => user.participant)
  users: User[];

  @OneToMany(() => Participant, (participant) => participant.user)
  participants: Participant[];

  @OneToMany(() => Message, (message) => message.thread, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  messages: Message[];
}
