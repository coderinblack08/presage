import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Article } from "src/article/article.entity";
import { User } from "src/user/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity("journals")
export class Journal extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  description: string | null;

  @Field()
  @Column()
  emoji: string;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.journals, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;

  @Field(() => [Article])
  @OneToMany(() => Article, (article) => article.journal, { cascade: true })
  articles: Article[];

  @DeleteDateColumn()
  deletedAt: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
