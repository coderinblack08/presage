import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100 })
  title: string;

  @Column()
  description: string;

  @Column("json", { nullable: true })
  body?: any;

  @Column("bool", { default: false })
  published: boolean;

  @Column()
  readingTime: number;

  @Column("int", { default: 0 })
  likes: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
