import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _login: LoginService
    ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      confirmEmail: [null, Validators.required],
      password: [null, [Validators.minLength(6), Validators.required]],
      confirmPassword: [null, Validators.required]
    },{
      validators: [this.controlValuesAreEqual('password','confirmPassword'), this.controlValuesAreEqual('email','confirmEmail')]
    });
  }

  private isFormValid(): boolean {
    for(const i in this.registerForm.controls){
      if(this.registerForm.controls.hasOwnProperty(i)){
        this.registerForm.controls[i].markAsDirty();
        this.registerForm.controls[i].updateValueAndValidity();
      }
    }
    return this.registerForm.valid;
  }

  public register() {
      if (this.isFormValid()) {
      this._login.registerUser(this.registerForm.value);
    }
  }

  private controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const FormGroup = control as FormGroup
      const valueOfControlA = FormGroup.get(controlNameA)?.value
      const valueOfControlB = FormGroup.get(controlNameB)?.value

      const str = `{\"${controlNameA}Confirmed\":"true"}`;
      const errorObj = JSON.parse(str);

      if (valueOfControlA !== valueOfControlB) {
        FormGroup.controls[controlNameB].setErrors(errorObj);
        return errorObj;
      }
      else {
        return null;
      }
    }
  }
}

