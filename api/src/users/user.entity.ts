import { Article } from "src/articles/article.entity";
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
