import { User } from "../users/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ nullable: true })
  publishedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
