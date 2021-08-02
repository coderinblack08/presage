import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClaimedReward } from "./ClaimedReward";
import { Message } from "./Message";
import { User } from "./User";

@Entity()
export class DirectMessage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("bool", { default: true })
  open: boolean;

  @Column()
  senderId: string;

  @Column()
  recipientId: string;

  @Column()
  claimedRewardId: string;

  @OneToMany(() => Message, (message) => message.directMessage)
  messages: Message[];

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User; // person who claimed the reward

  @ManyToOne(() => User, (user) => user.receivedMessages)
  recipient: User; // the creator of the reward, author

  @OneToOne(() => ClaimedReward, (cr) => cr.directMessage)
  @JoinColumn({ name: "claimedRewardId" })
  claimedReward: ClaimedReward;

  @Column("timestamp", { nullable: true })
  lastMessageSentAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;
}
