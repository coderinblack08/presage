import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true })
  email: string | null;

  @Column("text", { unique: true, nullable: true })
  username: string | null;

  @Column()
  googleId: string;

  @Column()
  displayName: string;

  @CreateDateColumn()
  createdAt: Date;
}
