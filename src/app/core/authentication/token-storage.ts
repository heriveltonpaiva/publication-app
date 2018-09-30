import { Injectable } from '@angular/core';
import { User } from '../user/user';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const USER_ID_KEY = 'idUser';
const USER_ADMIN_KEY = 'userAdmin';

@Injectable()
export class TokenStorage {
  constructor() { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  public saveToken(auth: any) {
    localStorage.setItem(TOKEN_KEY, auth);
  }

  public saveUser(user: any){
    localStorage.setItem(USERNAME_KEY, user.login);
    localStorage.setItem(USER_ID_KEY, user._id);
    localStorage.setItem(USER_ADMIN_KEY, user.userAdmin);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isAuthenticated(){
    return this.getToken() != null;
  }
}