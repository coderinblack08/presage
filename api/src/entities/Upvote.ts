import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Soundbite } from "./Soundbite";
import { User } from "./User";

@Entity()
export class Upvote extends BaseEntity {
  @Column("int")
  value: number;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @PrimaryColumn()
  soundbiteId: string;

  @ManyToOne(() => Soundbite, (soundbite) => soundbite.upvotes)
  soundbite: Soundbite;
}
