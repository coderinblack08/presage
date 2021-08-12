import { IsEmail, IsOptional, IsUrl, Length, Matches } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Article } from "./Article";
import { ClaimedReward } from "./ClaimedReward";
import { Journal } from "./Journal";
import { Like } from "./Like";
import { Referral } from "./Referral";
import { Reward } from "./Reward";
import { Shoutout } from "./Shoutout";
import { UserPoints } from "./UserPoints";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsEmail()
  @IsOptional()
  @Column("text", { nullable: true, select: false })
  email: string | null;

  @Length(1, 50)
  @Matches(/^[\-a-zA-Z0-9]+$/)
  @Column({ unique: true })
  username: string;

  @Length(1, 50)
  @Column()
  displayName: string;

  @Length(1, 500)
  @IsOptional()
  @Column("text", { nullable: true })
  bio: string | null;

  @IsUrl()
  @Column("text", { nullable: true })
  profilePicture: string | null;

  @Column("text", { select: false, nullable: true })
  googleId: string | null;

  @OneToMany(() => Article, (article) => article.user, { cascade: true })
  articles: Article[];

  @OneToMany(() => Like, (like) => like.user, { cascade: true })
  likes: Like[];

  @OneToMany(() => Journal, (like) => like.user, { cascade: true })
  journals: Journal[];

  @OneToMany(() => Reward, (reward) => reward.user, { cascade: true })
  rewards: Reward[];

  @OneToMany(() => UserPoints, (up) => up.user, { cascade: true })
  userPoints: UserPoints[];

  @OneToMany(() => UserPoints, (up) => up.creator, { cascade: true })
  readerPoints: UserPoints[];

  @OneToMany(() => Referral, (referral) => referral.referrer, { cascade: true })
  referrals: Referral[];

  @OneToMany(() => Shoutout, (shoutout) => shoutout.user, { cascade: true })
  shoutouts: Shoutout[];

  @OneToMany(() => ClaimedReward, (cr) => cr.user, { cascade: true })
  claims: ClaimedReward[];

  @ManyToMany(() => User, (user) => user.following, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers, {
    onDelete: "CASCADE",
  })
  following: User[];

  @Column("int", { default: 0 })
  followersCount: number;

  @Column("int", { default: 0 })
  followingCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
