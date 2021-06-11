import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Like } from "./Like";
import { Presage } from "./Presage";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true })
  email: string | null;

  @Column({ unique: true })
  username: string;

  @Column()
  displayName: string;

  @Column("text", { nullable: true })
  bio: string | null;

  @Column("text", { nullable: true })
  profilePicture: string | null;

  @Column()
  googleId: string;

  @Column({ default: 1 })
  tokenVersion: number;

  @OneToMany(() => Presage, (presage) => presage.user)
  presages: Presage[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
