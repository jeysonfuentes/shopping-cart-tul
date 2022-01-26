import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMenuItem } from './app.interface';
import { AppState } from './state/app.model';
import * as AuthActions from './state/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shopping-cart';

  mainMenu: Array<IMenuItem> = [
    {
      text: 'Products',
      url: 'products',
    },
    {
      text: 'Orders',
      url: 'orders',
    },
    {
      text: 'About',
      url: 'about',
    },
  ];
  nickName = '';
  hasLogged = false;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.select('auth').subscribe(({ currentUser }) => {
      if (currentUser) {
        this.nickName = currentUser.email.split('@')[0];
        this.hasLogged = true;
      } else {
        const localUser = JSON.parse(localStorage.getItem('currentUser'));
        if (localUser) {
          this.nickName = localUser.email.split('@')[0];
          this.hasLogged = true;
        }
      }
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    // this.store.dispatch(AuthActions.LogOut());
  }
}
