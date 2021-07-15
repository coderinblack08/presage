import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity()
export class Journal extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.journals)
  user: User;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column("text", { nullable: true })
  description: string | null;

  @Column("int", { default: 0 })
  entries: number;

  @OneToMany(() => Article, (article) => article.journal)
  articles: Article[];

  @CreateDateColumn()
  createdAt: Date;
}
