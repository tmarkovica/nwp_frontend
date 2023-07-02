import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserUpdateRequest } from 'src/app/interfaces/user-update-request';
import { TokenManagerService } from 'src/app/services/token-manager/token-manager.service';
import { UserDetails } from 'src/app/interfaces/user-details';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public userUpdateRequest: UserUpdateRequest;

  public userDetails: UserDetails

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _tokenManager: TokenManagerService,
    private _login: LoginService
  ) {

  }

  ngOnInit(): void {
    this.userDetails = this._tokenManager.getUserDetails();
    this.form = this.fb.group({
      firstName: [{ value: this.userDetails.firstName, disabled: true }, Validators.required],
      lastName: [{ value: this.userDetails.lastName, disabled: true }, Validators.required],
      address: [{ value: this.userDetails.address, disabled: true }, Validators.required],
      phone: [{ value: this.userDetails.phone, disabled: true }, Validators.required]
    });
  }

  private setCursorToInput(formControlName: string) {
    const inputElement = <HTMLInputElement>document.querySelector(`input[formControlName="${formControlName}"]`);
    inputElement.focus();
    inputElement.select();
  }

  public enableInput(formControlName: string) {
    this.form.get(formControlName).enable();
    this.setCursorToInput(formControlName);
  }

  public saveSettings() {
    if (this.form.valid) {
      this._login.updateUserDetails(this.form.getRawValue());

      for (const key in this.form.controls) {
        this.form.get(key).disable();
      }
    }
  }

  public isInputDisabled(key: string): boolean {
    return this.form.get(key).disabled;
  }
}
