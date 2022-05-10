import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Message } from "./message.entity";
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

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  toJSON() {
    delete this.password;
    return this;
  }
}
