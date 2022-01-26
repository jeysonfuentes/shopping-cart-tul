import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/firebase/auth/auth.service';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.LoginUser),
      mergeMap(({ credentials, remenberMe }) =>
        this.authService.login(credentials).pipe(
          map((response) => {
            const user: User = {
              email: response.user.email,
              uid: response.user.uid,
            };
            if (remenberMe) {
              localStorage.setItem(
                'currentUser',
                JSON.stringify(user)
              );
            }
            return user;
          }),
          map((user) => {
            return authActions.LoginUserSuccess({ user });
          }),
          catchError((error) => {
            // this.loadingService.dismiss();
            // this.alertService.showInfoAlert(
            //   'Error',
            //   'El email no coincide con la contraseña. Revisa que has introducido los datos correctamente'
            // );
            return of(authActions.LoginUserError({ error }));
          })
        )
      )
    )
  );

  singUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.SingUpUser),
      mergeMap(({ credentials }) =>
        this.authService.emailSignup(credentials).pipe(
          map(() =>
            authActions.LoginUser({
              credentials: {
                email: credentials.email,
                password: credentials.password,
              },
              remenberMe: false,
            })
          ),
          catchError((error) => {
            // this.loadingService.dismiss();
            // this.alertService.showInfoAlert(
            //   'Error',
            //   'El correo ya se encuentra registrado'
            // );
            return of(authActions.LoginUserError({ error }));
          })
        )
      )
    )
  );
}
