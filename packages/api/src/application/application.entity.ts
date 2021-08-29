import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

enum ApplicationStatus {
  Declined,
  Pending,
  Accepted,
}

@Entity("applications")
@ObjectType()
export class Application extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  reason: string;

  // socials
  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  twitter: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  instagram: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  linkedin: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  medium: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  substack: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  website: string | null;

  @Field()
  @Column({
    type: "enum",
    enum: ApplicationStatus,
    default: ApplicationStatus.Pending,
  })
  status: ApplicationStatus;

  @Field()
  @Column()
  userId: string;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
