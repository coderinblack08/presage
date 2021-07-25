import {
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsUrl,
  Length,
} from "class-validator";
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
  @IsAlphanumeric()
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

  @Column({ select: false })
  googleId: string;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Journal, (like) => like.user)
  journals: Journal[];

  @OneToMany(() => Reward, (reward) => reward.user)
  rewards: Reward[];

  @OneToMany(() => UserPoints, (up) => up.user)
  userPoints: UserPoints[];

  @OneToMany(() => UserPoints, (up) => up.creator)
  readerPoints: UserPoints[];

  @OneToMany(() => Referral, (referral) => referral.referrer)
  referrals: Referral[];

  @OneToMany(() => ClaimedReward, (cr) => cr.user)
  claims: ClaimedReward[];

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
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
