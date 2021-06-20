import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity()
export class Echo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  audio: string;

  @Column("text", { nullable: true })
  thumbnail?: string;

  @Column()
  duration: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.echos)
  user: User;

  @Column("text", { nullable: true })
  categoryId?: string;

  @ManyToOne(() => Category, (category) => category.echos)
  category?: Category[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
