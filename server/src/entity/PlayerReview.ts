import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from "typeorm";
import { Length } from "class-validator";

@Entity()
export class PlayerReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: number;

  @Column()
  @Length(4, 200)
  reviewDescp: string;

  @Column()
  @Length(4, 50)
  username: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;


}
