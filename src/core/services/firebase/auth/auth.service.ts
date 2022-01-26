import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/state/auth/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  login(credentials: LoginCredentials): Observable<any> {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  emailSignup(credentials: LoginCredentials): Observable<any> {
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    );
  }

  signOut() {
    return from(this.firebaseAuth.signOut());
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
