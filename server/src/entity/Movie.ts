import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from "typeorm";
import { Length, IsNotEmpty, IsBoolean, IsNumber } from "class-validator";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 200)
  movieName: string;

  @Column()
  @IsNotEmpty()
  @Length(3, 20)
  category: string;

  @Column()
  @IsBoolean()
  isShow: boolean;

  @Column()
  @IsNumber()
  likeCount: number;

  @Column()
  @IsNumber()
  userId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;


}
