import { NotificationType } from "../../../../../types/NotificationType";

export interface NotificationToDisplay {
  title: string,
  content: string,
  duration: number,
  type: NotificationType
}
