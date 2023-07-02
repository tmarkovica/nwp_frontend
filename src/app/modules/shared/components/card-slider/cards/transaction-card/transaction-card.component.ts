import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankTransaction } from 'src/app/interfaces/bank-transaction';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card {{cardBackground()}}">
      <div class="content">
        <p>Transaction: {{data?.transactionType}}</p>
        <p>User: {{data?.userId}}</p>
        <p>Account: {{data?.accountId}}</p>
        <p>Amount: {{data?.amount}}</p>
        <p>Date: {{getDate()}}</p>
        <p>Time: {{getTime()}}</p>
      </div>
    </div>

  `,
  styles: [`
    .card {
      background-size: cover;
      height: 180px;
      border-radius: 15px;
      color: white;
      box-shadow: black 0px 0px 5px 1px;
    }

    .content {
      padding: 20px;
    }

    .card p {
      margin: 0px;
    }

    .deposit-background {
      background-color: lightgreen;
    }

    .withdraw-background {
      background-color: lightcoral;
    }
  `
  ]
})
export class TransactionCardComponent implements OnInit {

  public data: BankTransaction;

  private date: Date;

  constructor() { }

  ngOnInit(): void {
    this.date = new Date(this.data.date);
  }

  public getDate(): string {
    return this.date.getDay() + '.' + this.date.getMonth() + '.'+ this.date.getFullYear() + '.';
  }

  public getTime(): string {
    return this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
  }

  public cardBackground(): string {
    return `${this.data.transactionType}-background`;
  }
}
