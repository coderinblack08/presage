import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UserPoints extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  creatorId: string;

  @ManyToOne(() => User, (user) => user.userPoints)
  user: User;

  @ManyToOne(() => User, (user) => user.readerPoints)
  creator: User;

  @Column("int", { default: 0 })
  points: number;
}
