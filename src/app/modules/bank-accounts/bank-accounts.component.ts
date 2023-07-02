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
  public titleCreateBankAccount: string = "Create bank account";

  @ViewChild('deposit') modalDeposit: ModalTransactionComponent;

  @ViewChild('withdraw') modalWithdraw: ModalTransactionComponent;

  @ViewChild('modalTerms') modalTermsOfUse: ModalComponent;
  public titleReadTermsOfUse: string = "Read terms of use";

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
}
