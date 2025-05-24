// src/controllers/NotificationController.ts
import { Request, Response } from "express";
import { NotificationService } from "../services/NotificationService";
import { CreateNotificationDto, } from "../dtos/Notificationdto/CreateNotification";
import {MarkAsSeenDto } from "../dtos/Notificationdto/MarkAsSeen"

export class NotificationController {
  private notificationService = new NotificationService();

  async getMyNotifications(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const notifications = await this.notificationService.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener notificaciones" });
    }
  }

  async markSeen(req: Request, res: Response): Promise<void> {
    try {
      const data: MarkAsSeenDto = req.body;
      await this.notificationService.markAsSeen(data);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Error al marcar notificaciones" });
    }
  }

  async createNotification(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateNotificationDto = req.body;
      const notification = await this.notificationService.createPersonalNotification(data);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: "Error al crear notificación" });
    }
  }
}