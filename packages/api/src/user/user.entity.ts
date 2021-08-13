import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true, select: false })
  email: string | null;

  @Column()
  displayName: string;

  @Column({ unique: true })
  username: string;

  @Column("text", { nullable: true })
  bio: string | null;

  @Column("text", { nullable: true })
  profilePicture: string | null;

  @Column("text", { select: false, nullable: true })
  googleId: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
