import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("points")
export class Point extends BaseEntity {
  @PrimaryColumn()
  readerId: string;

  @PrimaryColumn()
  writerId: string;

  @ManyToOne(() => User)
  reader: User;

  @ManyToOne(() => User)
  writer: User;

  @Column({ default: 0 })
  points: number;
}
