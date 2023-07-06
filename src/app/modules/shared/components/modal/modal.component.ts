import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from 'src/app/services/bank/bank.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public form: FormGroup;

  @Input() public modalTitle: string = "Modal Title";
  @Input() public visible: boolean;
  @Input() public buttonConfirmText: string = "Yes";
  @Input() public buttonDeclineText: string = "No";

  constructor(
    private fb: FormBuilder,
    private _bank: BankService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      score: [0, [Validators.required]],
      note: ['', [Validators.required]]
    });
  }

  public openModal() {
    this.visible = true;
  }

  public closeModal() {
    this.visible = false;
  }

  public createBankAccount() {
    this.closeModal();
    this._bank.createNewBankAccount(this.form.value).then((res: boolean) => {
    });
  }
}
