// src/repositories/MessageRepository.ts
import { AppDataSource } from "../config/database";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { Repository } from "typeorm";

export class MessageRepository {
  private repository: Repository<Message>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(Message);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(data: { content: string; senderId: number; receiverId: number }) {
    const sender = await this.userRepository.findOneBy({ id: data.senderId });
    const receiver = await this.userRepository.findOneBy({ id: data.receiverId });

    if (!sender || !receiver) {
      throw new Error("Sender o receiver no encontrado");
    }

    const message = this.repository.create({
      content: data.content,
      sender,
      receiver
    });

    return await this.repository.save(message);
  }

  async getConversation(userId1: number, userId2: number) {
    return this.repository.find({
      where: [
        { sender: { id: userId1 }, receiver: { id: userId2 } },
        { sender: { id: userId2 }, receiver: { id: userId1 } }
      ],
      order: { id: "ASC" },
      relations: ["sender", "receiver"]
    });
  }

  async getUserMessages(userId: number) {
    return this.repository.find({
      where: [
        { sender: { id: userId } },
        { receiver: { id: userId } }
      ],
      order: { id: "ASC" },
      relations: ["sender", "receiver"]
    });
  }
}

export const messageRepository = new MessageRepository();