import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true })
  email: string | null;

  @Column({ unique: true })
  username: string;

  @Column()
  displayName: string;

  @Column("text", { nullable: true })
  bio: string | null;

  @Column("text", { nullable: true })
  profilePicture: string | null;

  @Column()
  googleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
