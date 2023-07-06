import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BankAccount } from 'src/app/interfaces/bank-account';
import { BankTransaction } from 'src/app/interfaces/bank-transaction';
import { TokenManagerService } from '../token-manager/token-manager.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private options = {
    headers: new HttpHeaders({
      "Authorization": `Basic ${this._tokenManager.getBasicAuth()}`
    })
  };

  public bankAccounts: BehaviorSubject<BankAccount[]> = new BehaviorSubject(null);

  public transactionHistory: BehaviorSubject<BankTransaction[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private _tokenManager: TokenManagerService
  ) {
    this.retrieveBankAccountsFromUser();
  }

  public retrieveBankAccountsFromUser() {
    const id: number = this._tokenManager.getUserId();

    this.http.get(`${environment.api_url}/Score/Score/${id}`).subscribe((res: BankAccount[]) => { //this.options
      this.bankAccounts.next(res);
    });
  }

  public createNewBankAccount(temp: {score: number, note: string}): Promise<boolean> {
    return this.http.post(`${environment.api_url}/Score/Score/${this._tokenManager.getUserId()}`, { //'http://localhost:8080/bank-accounts'
      "score": temp.score,
      "note": temp.note
    }, this.options).toPromise().then(() => {
      this.retrieveBankAccountsFromUser();
      return true;
    }).catch((err: Error) => {
      return false;
    });
  }

  private deleteAccountWithIdAndNotifySubscribers(id: number) {
    const arr: BankAccount[] = new Array()
    this.bankAccounts.value.forEach((element: BankAccount) => {
      if (element.id != id)
        arr.push(element)
    })
    this.bankAccounts.next(arr)
  }

  public deleteBankAccount(id: number): Promise<boolean> {
    return this.http.delete(`${environment.api_url}/Score/Score/${this._tokenManager.getUserId()}/${id}`, this.options) //`http://localhost:8080/bank-accounts/${id}`
    .toPromise().then((res: any) => {
      this.deleteAccountWithIdAndNotifySubscribers(id);
      this.logTransaction('withdraw', 0, id);
      return true
    }).catch((err: Error) => {
      console.log(err);
      return false;
    });
  }

  public transferMoney(withdrawId: number, depositId: number, amount: number) {
    this.http.patch(`http://localhost:8080/bank-accounts/${withdrawId}/transfer/${depositId}?amount${amount}`, this.options).toPromise()
    .then((res: HttpStatusCode.NoContent) => {

    }).catch(error => {
      console.log(error)
    })
  }

  public editScore(scoreProfileId: number, score: number) {
    return this.http.put(`${environment.api_url}/Score/Score/${scoreProfileId}`, {score: score, note: ''}, this.options)
    .toPromise().then((res: HttpStatusCode.NoContent) => {
      this.bankAccounts.value.find((ba: BankAccount) => {
        if (ba.id === scoreProfileId)
        ba.score = score;
      })
      this.logTransaction('deposit', score, scoreProfileId);
      return true;
    }).catch((err: Error) => {
      return false;
    })
  }

  public editNote(scoreProfileId: number, note: string) {
    return this.http.put(`${environment.api_url}/Score/Score/${scoreProfileId}`, {score: -1, note: note}, this.options)
    .toPromise().then((res: HttpStatusCode.NoContent) => {
      this.bankAccounts.value.find((ba: BankAccount) => {
        if (ba.id === scoreProfileId)
        ba.note = note;
      })
      this.logTransaction('deposit', scoreProfileId);
      return true;
    }).catch((err: Error) => {
      return false;
    })
  }

  /* public depositMoney(id: number, amount: number): Promise<boolean> {
    return this.http.patch(`http://localhost:8080/bank-accounts/${id}/deposit?amount=${amount}`, "", this.options)
    .toPromise().then((res: HttpStatusCode.NoContent) => {
      this.retrieveBalance(id);
      this.logTransaction('deposit', amount, id);
      return true;
    }).catch((err: Error) => {
      return false;
    })
  }

  public retrieveBalance(id: number) {
    this.http.get(`http://localhost:8080/bank-accounts/${id}/balance`, this.options).subscribe((res: number)=> {
      this.bankAccounts.value.find((ba: BankAccount) => {
        if (ba.id === id)
        ba.balance = res;
      })
    });
  }

  public withdrawMoney(id: number, amount: number): Promise<boolean> {
    return this.http.patch(`http://localhost:8080/bank-accounts/${id}/withdraw?amount=${amount}`, "", this.options).toPromise()
    .then((res: HttpStatusCode.NoContent) => {
      this.retrieveBalance(id);
      this.logTransaction('withdraw', amount, id);
      return true;
    }).catch(error => {
      console.log(error)
      return false;
    })
  } */

  public getBankAccountWithId(id: number): BankAccount {
    return this.bankAccounts.value.find((account: BankAccount) => account.id === id);
  }

  /* public isWitdrawlAmountPossibleFromAccountWithId(amount: number, id: number): boolean {
    const withdrawAcc = this.getBankAccountWithId(id);
    if (amount <= withdrawAcc.limitWithdraw && (withdrawAcc.balance - amount >= -1 * withdrawAcc.allowedMinus))
      return true;
    else
      return false;
  } */

  private logTransaction(
    transactionType: string,
    amountId: number,
    account: number = 0
    ) {
      const userId = this._tokenManager.getUserId();

      const transaction: BankTransaction = {
        transactionType: transactionType,
        amount: amountId,
        userId: userId,
        accountId: account,
        date: this.getDateNowISOString()
      }

      this.transactionHistory.next([...this.transactionHistory.value, transaction]);
  }

  private getDateNowISOString(): string {
    const d = new Date()
    d.setHours(d.getHours() + 1);
    return d.toISOString();
  }
}
