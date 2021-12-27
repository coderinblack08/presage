import { User } from "../users/user.entity";
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
import { Reaction } from "../reactions/reactions.entity";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  canonical?: string;

  @Column("text", { array: true })
  tags: string[];

  @Column("bool", { default: false })
  isPublished: boolean;

  @Column()
  userId: string;

  @Column("jsonb", { nullable: true })
  editorJSON?: any;

  @ManyToOne(() => User, (u) => u.articles)
  user: User;

  @OneToMany(() => Reaction, (r) => r.user)
  reactions: Reaction[];

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  commentCount: number;

  @Column({ default: 0 })
  shareCount: number;

  @Column({ nullable: true })
  publishedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
