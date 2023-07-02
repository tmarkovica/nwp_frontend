import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './service/notification.service';
import { NotificationToDisplay } from './notification/Notification';

@Component({
  selector: 'app-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss']
})
export class NotificationsContainerComponent implements OnInit {

  @ViewChild('notificationContainer', { read: ViewContainerRef }) notificationContainer: ViewContainerRef;

  private notificationRefs: Array<ComponentRef<NotificationComponent>> = [];

  constructor(
    private _notification: NotificationService
  ) { }

  ngOnInit(): void {
    this._notification.notificationQueueNotifier.subscribe((res: NotificationToDisplay[]) => {
      res.forEach((element: NotificationToDisplay)=> {
        this.createNotification(element);
      });
    });
  }

  private createNotification(notification: NotificationToDisplay) {
    const notificationRef: ComponentRef<NotificationComponent> = this.notificationContainer.createComponent(NotificationComponent);
    notificationRef.instance.title = notification.title;
    notificationRef.instance.content = notification.content;
    notificationRef.instance.notificationType = notification.type;
    notificationRef.instance.componentRef = notificationRef;

    this.notificationRefs.push(notificationRef);
    this.removeNotification(notification.duration, notificationRef);
  }

  removeNotification(time: number, componentRef: ComponentRef<NotificationComponent>) {
    setTimeout(() => {
      componentRef.destroy()
    }, time);
  }
}
