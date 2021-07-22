import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Journal } from "./Journal";
import { Like } from "./Like";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 100 })
  title: string;

  @Column("text", { nullable: true })
  body: string | null;

  @Column("json", { nullable: true })
  bodyJson: any | null;

  @Column("bool", { default: false })
  published: boolean;

  @Column("text", { nullable: true })
  readingTime: string | null;

  @Column("int", { default: 0 })
  points: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true, eager: true })
  tags: Tag[];

  @OneToMany(() => Like, (like) => like.article)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @Column()
  journalId: string;

  @ManyToOne(() => Journal, (journal) => journal.articles)
  journal: Journal;

  @Column("tsvector", { select: false, nullable: true })
  document: any;

  @Column("timestamp", { nullable: true })
  publishedDate: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
