import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationToDisplay } from '../notification/Notification';
import { NotificationType } from '../../../../../types/NotificationType';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationQueue: NotificationToDisplay[] = [];

  public notificationQueueNotifier: BehaviorSubject<NotificationToDisplay[]> = new BehaviorSubject([]);

  constructor() { }

  public addNotificationToQueue(notification: NotificationToDisplay) {
    this.notificationQueue.push(notification);
  }

  public showNotification(notification: NotificationToDisplay) {
    this.notificationQueueNotifier.next([notification]);
    console.log(this.notificationQueueNotifier.value);

  }

  public notify() {
    this.notificationQueueNotifier.next(this.notificationQueue);
    this.notificationQueue = [];
  }

  public createNotificationToDisplay(
    title: string,
    content: string,
    duration: number | 2000,
    type: NotificationType
  ): NotificationToDisplay {
    const notification: NotificationToDisplay = {
      title: title,
      content: content,
      duration: duration,
      type: type
    }
    return notification;
  }
}
