import { Component, ComponentRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationType } from '../../../../../types/NotificationType';
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification {{backgroundColor()}}" (click)="removeNotification()" [@slide]="isVisible ? 'visible' : 'hidden'">
      <h4>{{title}}</h4>
      <p>{{content}}</p>
    </div>
  `,
  styleUrls: [],
  styles: [`
    .notification {
      background-color: #7bfda3;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #3c423d;
      z-index: 100;
      margin-top: 10px;
      margin-left: 300px;
      margin-right: 300px;
      flex-direction: column;
      height: auto;
    }

    .notification h4, p {
      margin: 5px;
    }

    .notification:hover {
      opacity: 0.8 !important;
      cursor: pointer;
    }

    .sucess {
      background-color: #7bfda3;
    }

    .warning {
      background-color: #f7ff3a;
    }

    .failure {
      background-color: #ff3e45;
    }

    @media only screen and (max-width: 992px) {
      .notification {
        margin-left: 90px;
        margin-right: 90px;
      }
    }

    @media only screen and (max-width: 576px) {
      .notification {
        margin-left: 25px;
        margin-right: 25px;
      }
    }
    `
  ],
  animations: [
    trigger('slide', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        transition: 'all 0.5s ease'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0%)',
        transition: 'all 0.5s ease 0s'
      }))
    ]),
  ],
})
export class NotificationComponent implements OnInit {

  public title?: string;
  public content: string;
  public notificationType: NotificationType;
  public componentRef: ComponentRef<NotificationComponent>;
  public isVisible: boolean = false;

  public animationState = 'hidden';

  constructor(
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  removeNotification() {
    this.isVisible = !this.isVisible;

    setTimeout(() => {
      this.componentRef.destroy();
    }, 500);
  }

  backgroundColor(): string {
    return `${this.notificationType}`;
  }
}
