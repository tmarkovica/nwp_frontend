import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BankService } from 'src/app/services/bank/bank.service';
import { NotificationToDisplay } from '../notifications-container/notification/Notification';
import { NotificationType } from '../../../../types/NotificationType';
import { NotificationService } from '../notifications-container/service/notification.service';

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.scss']
})
export class ModalTransactionComponent implements OnInit {

  public accountId: number;
  @Input() public modalTitle: string = "Modal Title";
  @Input() public visible: boolean;
  @Input() public buttonConfirmText: string = "Yes";
  @Input() public buttonDeclineText: string = "No";

  @Output() public confirmClicked: EventEmitter<number> = new EventEmitter();

  public amount: number = 0;

  constructor(
    private _bank: BankService,
    private _notification: NotificationService
  ) { }

  ngOnInit(): void {
  }

  public openModal(accountId: number) {
    this.visible = true;
    this.accountId = accountId;
  }

  public closeModal() {
    this.visible = false;
  }

  public buttonConfirmClick() {
    this.confirmClicked.emit(this.accountId);

    /* if (this.amount == null || this.amount < 0)
      return;

    if (this.modalTitle === 'Withdraw')
      this.withdraw()
    else if (this.modalTitle === 'Deposit')
      this.deposit() */
  }

  public clearField() {
    this.amount = 0;
  }

  private deposit() {
    /* this._bank.depositMoney(this.accountId, this.amount).then((isDepositSuccessful: boolean) => {
      let temp: NotificationToDisplay;
      if (isDepositSuccessful) {
        temp = this._notification.createNotificationToDisplay(
          `Deposit Successful`,
          `Deposited ${this.amount} to account with ID: ${this.accountId}.`,
          3000,
          NotificationType.SUCESS
          );
          this.clearField();
      } else {
        temp = this._notification.createNotificationToDisplay(
          `Delete unsuccessful`,
          `Unable to deposit to account with ID: ${this.accountId}.`,
          3000,
          NotificationType.FAILURE
        );
      }
      this._notification.showNotification(temp);
    });
    this.closeModal() */
  }

  private withdraw() {
    /* let temp: NotificationToDisplay;
    if(this._bank.isWitdrawlAmountPossibleFromAccountWithId(this.amount, this.accountId)) {
      this._bank.withdrawMoney(this.accountId, this.amount).then((isWithdrawSuccessful: boolean) => {
        if (isWithdrawSuccessful) {
          temp = this._notification.createNotificationToDisplay(
            `Withdraw Successful`,
            `Withdrawn ${this.amount} from account with ID: ${this.accountId}.`,
            3000,
            NotificationType.SUCESS
            );
            this.clearField();
        } else {
          temp = this._notification.createNotificationToDisplay(
            `Withdraw Unsuccessful`,
            `Withdrawing ${this.amount} from account with ID: ${this.accountId} unsuccessful.`,
            3000,
            NotificationType.FAILURE
            );
          }
          this._notification.showNotification(temp);
      });
    }
    else {
      temp = this._notification.createNotificationToDisplay(
        `Withdraw not possible`,
        `You exceed your withdraw limit or allowed minus amount.`,
        4000,
        NotificationType.WARNING
      )
      this._notification.showNotification(temp);
    }
    this.closeModal(); */
  }
}
