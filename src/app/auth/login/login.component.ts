import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.model';
import { LoginCredentials } from 'src/app/state/auth/auth.interfaces';
import { User } from 'src/core/models/user.model';
import * as AuthActions from '../../state/auth/';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = {
        email: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };
      this.store.dispatch(AuthActions.LoginUser({credentials, remenberMe: this.loginForm.value.remember} ));
    }
  }
}
