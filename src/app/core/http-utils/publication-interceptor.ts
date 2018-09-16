import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

/**
 * @author Herivelton Paiva
 * Interceptador de requisições
 * Para interceptar as requisições Http é necessário que seja utilizado o HttpClient nos services
 * Essa classe é responsável por passar o token para o servidor e tratar as exceções de erros do sistema 
 */
@Injectable()
export class PublicationInterceptor implements HttpInterceptor {
  constructor(private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<HttpUserEvent<any>> {

    if (localStorage.getItem('token') != null) {
      const params = new HttpParams().set('token', localStorage.getItem('token'));
      req = req.clone({params})
      return next.handle(req); 
    }else if(localStorage.getItem('token') == null){
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