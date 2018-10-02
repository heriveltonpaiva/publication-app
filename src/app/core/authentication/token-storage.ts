import { Injectable } from '@angular/core';
const TOKEN_KEY = 'token';
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
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(PASSWORD_KEY);
    localStorage.removeItem(RESUMO_KEY);
    localStorage.removeItem(PHOTO_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_ADMIN_KEY);
    localStorage.removeItem(ID_PHOTO_KEY);
  }

  public saveToken(auth: any) {
    localStorage.setItem(TOKEN_KEY, auth);
  }

  public saveUser(user: any){
    console.log(user);
    localStorage.setItem(USERNAME_KEY, user.name);
    localStorage.setItem(LOGIN_KEY, user.login);
    localStorage.setItem(EMAIL_KEY, user.login);
    localStorage.setItem(PASSWORD_KEY, user.password);
    localStorage.setItem(RESUMO_KEY, user.resumo);
    if(user.idArquivo){
      localStorage.setItem(PHOTO_KEY, user.idArquivo.data);
      localStorage.setItem(ID_PHOTO_KEY, user.idArquivo._id);
    }
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