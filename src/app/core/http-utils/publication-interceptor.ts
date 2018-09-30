import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { TokenStorage } from '../authentication/token-storage';
const TOKEN_KEY = 'token';

/**
 * @author Herivelton Paiva
 * Interceptador de requisições
 * Para interceptar as requisições Http é necessário que seja utilizado o HttpClient nos services
 * Essa classe é responsável por passar o token para o servidor e tratar as exceções de erros do sistema 
 */
@Injectable()
export class PublicationInterceptor implements HttpInterceptor {
  constructor(private router: Router, private tokenStorage: TokenStorage){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<HttpUserEvent<any>> {
    if (this.tokenStorage.isAuthenticated()) {
      const params = new HttpParams().set(TOKEN_KEY, this.tokenStorage.getToken());
      req = req.clone({params})
      return next.handle(req); 
    }else{
        this.router.navigate(['login']);
    }
    return next.handle(req).do(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['error']);
          }
          return next.handle(req);
        }
      }
    );
  }
}