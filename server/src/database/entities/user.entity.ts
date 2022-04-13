import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Participant } from "./participant.entity";
import { Thread } from "./thread.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  firstName: string;

  @Index()
  @Column()
  lastName: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Thread, (thread) => thread.users)
  @JoinTable()
  threads: Thread[];

  @OneToMany(() => Participant, (participant) => participant.user)
  threadParticipant: Participant[];
}
