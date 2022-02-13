import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from "typeorm";
import { Length, IsNotEmpty, IsBoolean, IsNumber } from "class-validator";

@Entity()
export class MovieReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: number;

  @Column()
  @Length(4, 200)
  reviewDescp: string;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;


}
