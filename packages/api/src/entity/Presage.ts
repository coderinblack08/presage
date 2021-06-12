import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Like } from "./Like";
import { User } from "./User";

@Entity()
export class Presage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: ["audio", "text"] })
  type: "audio" | "text";

  @Column("text", { nullable: true })
  title: string | null;

  @Column("text", { nullable: true })
  description: string | null;

  @Column("text", { nullable: true })
  content: string | null;

  @Column("text", { nullable: true })
  audio: string | null;

  @Column("text", { nullable: true })
  thumbnail: string | null;

  @Column("int", { nullable: true })
  duration: number | null;

  @Column("int", { default: 0 })
  points: number;

  @OneToMany(() => Like, (like) => like.presage)
  likes: Like[];

  @Column("text", { array: true })
  path: string[];

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.presages)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
