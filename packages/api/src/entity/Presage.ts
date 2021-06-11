import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from "typeorm";
import { Like } from "./Like";
import { User } from "./User";

@Entity()
@Tree("materialized-path")
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

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.presages)
  user: User;

  @TreeChildren()
  children: Presage[];

  @TreeParent()
  parent: Presage;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
