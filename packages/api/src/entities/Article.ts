import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("json", { nullable: true })
  body: any | null;

  @Column("bool", { default: false })
  published: boolean;

  @Column("int", { nullable: true })
  readingTime: number | null;

  @Column("int", { default: 0 })
  likes: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true, eager: true })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
