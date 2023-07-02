import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _login: LoginService,
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
    });
  }

  private isFormValid() {
    for(const i in this.loginForm.controls){
      if(this.loginForm.controls.hasOwnProperty(i)){
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
    return this.loginForm.valid;
  }

  public login() {
    if (this.isFormValid()) {
      this._login.login(this.loginForm.value);
    }
  }

  public loginWithReddit() {
    this._login.redirectToRedditForAuthorization();
  }
}
