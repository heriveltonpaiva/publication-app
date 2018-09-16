import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: any) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log("Token Salvo: "+this.getToken());
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}