// import {
//   PrimaryGeneratedColumn,
//   Entity,
//   JoinColumn,
//   OneToOne,
//   OneToMany,
//   ManyToOne,
//   Index,
//   ManyToMany,
//   JoinTable,
// } from "typeorm";
// import { Thread } from "./thread.entity";
// import { User } from "./user.entity";

// @Entity()
// export class Participant {
//   @Index()
//   @PrimaryGeneratedColumn()
//   id: number;

// @ManyToOne(() => Thread, (thread) => thread.participants)
// @ManyToOne(() => Thread, (thread) => thread.id)
// @JoinColumn({ name: "threadId" })
// thread: Thread;

// I think this reference to threads could be a bug
// The user ID keeps incrementing to a point where it exceeds
// the highest ID for User in DB
// @ManyToOne(() => User, (user) => user.threads)

// This also isn't quite right - I want to reference the ID of the user
// @ManyToOne(() => User, (user) => user.participant)

// Leads to a funky bug where thr participants table replaces previous instances of
// an ID with a different one. Only the latest record is correct
// @ManyToOne(() => User)
// @JoinColumn({ name: "userId" })

//   @OneToMany(() => User, user => user.)
//   @JoinTable()
//   users: User[];
// }
