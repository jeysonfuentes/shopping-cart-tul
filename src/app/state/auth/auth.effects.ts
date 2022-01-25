import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/core/services/firebase/auth/auth.service';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.LoginUser),
      mergeMap(({ credentials, remenberMe }) =>
        this.authService.login(credentials).pipe(
          tap(async (response) => {
            if (remenberMe) {
              await localStorage.setItem(
                'currentUser',
                JSON.stringify(response)
              );
            }
          }),
          map((response) => {
            return authActions.LoginUserSuccess({ user: response });
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

  $loginUserSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.LoginUserSuccess),
      tap(async (user) => {
        await localStorage.setItem('currentUser', JSON.stringify(user));
      }),
      catchError((error) => {
        // this.loadingService.dismiss();
        return of(authActions.LoginUserError({ error }));
      })
    )
  );
}
