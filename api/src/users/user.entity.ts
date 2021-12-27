import { Article } from "src/articles/articles.entity";
import { Reaction } from "src/reactions/reactions.entity";
import { Reward } from "src/rewards/rewards.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column("varchar", { length: 64 })
  displayName: string;

  @Column("varchar", { unique: true, length: 64 })
  username: string;

  @Column({ select: false })
  googleId: string;

  @Column({ nullable: true })
  bio?: string;

  @OneToMany(() => Article, (a) => a.user)
  articles: Article[];

  @OneToMany(() => Reward, (r) => r.user)
  rewards: Reward[];

  @OneToMany(() => Reaction, (r) => r.user)
  reactions: Reaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
