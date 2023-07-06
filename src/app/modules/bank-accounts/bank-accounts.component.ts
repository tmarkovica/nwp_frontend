import { Component, OnInit, TypeProvider, ViewChild, ViewContainerRef } from '@angular/core';
import { BankAccount } from 'src/app/interfaces/bank-account';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ModalTransactionComponent } from '../shared/components/modal-transaction/modal-transaction.component';
import { BankService } from 'src/app/services/bank/bank.service';
import { NotificationService } from '../shared/components/notifications-container/service/notification.service';
import { NotificationToDisplay } from '../shared/components/notifications-container/notification/Notification';
import { NotificationType } from '../../types/NotificationType';
import { BankTransaction } from 'src/app/interfaces/bank-transaction';
import { TransactionCardComponent } from '../shared/components/card-slider/cards/transaction-card/transaction-card.component';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss']
})
export class BankAccountsComponent implements OnInit {

  public bankAccounts: BankAccount[];
  public transactions: BankTransaction[];
  public readonly cardType: TypeProvider = TransactionCardComponent;

  @ViewChild('create') modalCreateBankAccount: ModalComponent;
  public titleCreateBankAccount: string = "Create score note";

  @ViewChild('deposit') modalDeposit: ModalTransactionComponent;

  @ViewChild('withdraw') modalWithdraw: ModalTransactionComponent;

  @ViewChild('modalTerms') modalTermsOfUse: ModalComponent;
  public titleReadTermsOfUse: string = "Read terms of use";

  public score: number = 0;
  public note: string = '';

  constructor(
    private _bank: BankService,
    private _notification: NotificationService
    ) { }

  ngOnInit(): void {
    this._bank.bankAccounts.subscribe((res: BankAccount[]) => {
      this.bankAccounts = res;
    });

    this._bank.transactionHistory.subscribe((transactions: BankTransaction[]) => {
      this.transactions = transactions;
    });
  }

  public openModal(modal: string, index: number) {
    if (modal === 'create')
      this.modalCreateBankAccount.openModal();
    else if (modal === 'deposit')
      this.modalDeposit.openModal(this.bankAccounts[index].id);
    else if (modal === 'withdraw')
        this.modalWithdraw.openModal(this.bankAccounts[index].id);

    this.score = this.bankAccounts[index].score;
    this.note = this.bankAccounts[index].note;
  }

  public deleteAccount(index: number) {
    const accountId = this.bankAccounts[index].id;
    this._bank.deleteBankAccount(accountId).then((res: boolean) => {
      let temp: NotificationToDisplay;
      if (res === true) {
        temp = this._notification.createNotificationToDisplay(
          `Bank Account Deleted`,
          `Bank Account ${accountId} deleted successfully.`,
          3000,
          NotificationType.FAILURE
        );
      }
      this._notification.showNotification(temp);
    });
  }

  public clearField() {
    this.score = 0;
    this.note = '';
  }

  public editScore(scoreProfileId: number) {
    this._bank.editScore(scoreProfileId, this.score).then((isDepositSuccessful: boolean) => {
      let temp: NotificationToDisplay;
      if (isDepositSuccessful) {
        temp = this._notification.createNotificationToDisplay(
          `Score Edited`,
          `Score set to ${this.score}.`,
          3000,
          NotificationType.SUCESS
          );
          this.clearField();
      } else {
        temp = this._notification.createNotificationToDisplay(
          `Editing unsuccessful`,
          `Unable to edit.`,
          3000,
          NotificationType.FAILURE
        );
      }
      this._notification.showNotification(temp);
      this.modalDeposit.closeModal();
    });
  }

  public editNote(scoreProfileId: number) {
    this._bank.editNote(scoreProfileId, this.note).then((isDepositSuccessful: boolean) => {
      let temp: NotificationToDisplay;
      if (isDepositSuccessful) {
        temp = this._notification.createNotificationToDisplay(
          `Note Edited`,
          `Note set to ${this.note}.`,
          3000,
          NotificationType.SUCESS
          );
          this.clearField();
      } else {
        temp = this._notification.createNotificationToDisplay(
          `Editing unsuccessful`,
          `Unable to edit.`,
          3000,
          NotificationType.FAILURE
        );
      }
      this._notification.showNotification(temp);
      this.modalWithdraw.closeModal();
    });
  }
}
