import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Presage } from "./Presage";
import { User } from "./User";

@Entity()
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @PrimaryColumn()
  presageId: string;

  @ManyToOne(() => Presage, (presage) => presage.likes)
  presage: Presage;
}
