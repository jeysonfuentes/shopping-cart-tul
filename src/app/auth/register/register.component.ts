import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { AppState } from 'src/app/state/app.model';
import { LoginCredentials } from 'src/app/state/auth/auth.interfaces';
import { AuthService } from 'src/core/services/firebase/auth/auth.service';

import * as AuthActions from '../../state/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      agree: [false],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const registerCredentials: LoginCredentials = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      // this.store.dispatch(AuthActions.SingUpUser({credentials: registerCredentials}));
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.registerForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
