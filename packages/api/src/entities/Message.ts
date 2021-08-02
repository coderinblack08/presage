import { Length, MaxLength } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DirectMessage } from "./DirectMessage";
import { User } from "./User";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Length(1, 1000)
  @Column()
  message: string;

  @Column()
  directMessageId: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => DirectMessage, (dm) => dm.messages)
  directMessage: DirectMessage;

  @CreateDateColumn()
  createdAt: Date;
}
