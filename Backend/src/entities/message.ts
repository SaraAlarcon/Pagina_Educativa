// src/entities/Message.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender!: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiver!: User;
}