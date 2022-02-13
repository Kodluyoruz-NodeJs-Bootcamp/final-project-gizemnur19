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
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 200)
  playerName: string;

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
