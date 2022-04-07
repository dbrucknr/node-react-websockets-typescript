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

  // Add Cascade property
  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: "participant",
    joinColumn: { name: "threadId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
  })
  participants: User[];

  // Add Cascade property
  @OneToMany(() => Message, (message) => message.thread, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  messages: Message[];
}
