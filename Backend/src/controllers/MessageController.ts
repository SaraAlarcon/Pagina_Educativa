// src/controllers/MessageController.ts
import { Request, Response, NextFunction } from "express";
import { MessageService } from "../services/MessageService";
import { CreateMessageDto } from "../dtos/message.ts/CreateMessage";
import { GetMessagesDto } from "../dtos/message.ts/GetMessages";

export class MessageController {
  private messageService = new MessageService();

  sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateMessageDto = req.body;
      
      const canCommunicate = await this.messageService.validateSameGroup(data.senderId, data.receiverId);
      if (!canCommunicate) {
        res.status(403).json({ message: "Los usuarios no pueden comunicarse" });
        return;
      }

      const message = await this.messageService.sendMessage(data);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message:"jdvuvwv",error });
    }
  }

  getConversation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: GetMessagesDto = {
        userId1: parseInt(req.params.userId1),
        userId2: parseInt(req.params.userId2)
      };

      const messages = await this.messageService.getConversation(data);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la conversación" });
    }
  }

  getUserMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);
      const messages = await this.messageService.getUserMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los mensajes" });
    }
  }
}