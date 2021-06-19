import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Echo } from "./Echo";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("int", { default: 0 })
  echoCount: number;

  @OneToMany(() => Echo, (echo) => echo.category)
  echos: Category[];
}
