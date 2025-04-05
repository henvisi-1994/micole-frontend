import { Notification } from './notification.model';

export interface NotificationByCourse {
  course: string
  notifications: Notification[]
}
