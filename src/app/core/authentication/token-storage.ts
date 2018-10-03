import { Injectable } from '@angular/core';
const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const USERNAME_KEY = 'username';
const USER_ID_KEY = 'idUser';
const USER_ADMIN_KEY = 'userAdmin';
const LOGIN_KEY = 'userLogin';
const PASSWORD_KEY = 'userPassword';
const RESUMO_KEY = 'userResumo';
const EMAIL_KEY = 'userEmail';
const PHOTO_KEY = 'userPhoto';
const ID_PHOTO_KEY = 'userIdPhoto';

@Injectable()
export class TokenStorage {
  constructor() { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  public saveToken(auth: any) {
    localStorage.setItem(TOKEN_KEY, auth);
  }

  public saveUser(user){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isAuthenticated(){
    return this.getToken() != null;
  }
}