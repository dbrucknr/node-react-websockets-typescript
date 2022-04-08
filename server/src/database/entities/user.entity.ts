import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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
}
