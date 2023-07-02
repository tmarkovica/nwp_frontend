import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsContainerComponent } from './notifications-container.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [NotificationsContainerComponent],
  imports: [
    CommonModule,
    NotificationComponent
  ],
  exports: [
    NotificationsContainerComponent,
  ]
})
export class NotificationsContainerModule { }
