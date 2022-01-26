import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.model';
import { LoginCredentials } from 'src/app/state/auth/auth.interfaces';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/firebase/auth/auth.service';
import * as AuthActions from '../../state/auth/';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe(({ currentUser }) => {
      if (currentUser) {
        this.router.navigateByUrl('/');
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = {
        email: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };
      // this.authService.login(credentials).subscribe((result) => {
      //   console.log(result);
      // })
      this.store.dispatch(
        AuthActions.LoginUser({
          credentials,
          remenberMe: this.loginForm.value.remember,
        })
      );
    }
  }
}
