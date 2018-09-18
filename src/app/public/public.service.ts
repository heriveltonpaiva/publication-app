import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

const URL = 'http://localhost:3000/api/public/';

@Injectable()  
export class PublicService {  
  
  constructor(private http: Http) { }  
 
  getAllCategoria(): Observable<any[]>{       
    return this.http.get(URL+'/categoria')  
    .map((response) => response.json()).catch(err=> Observable.throw(err));             
  }
  getAllAssunto(): Observable<any[]>{       
    return this.http.get(URL+'/assunto')  
    .map((response) => response.json()).catch(err=> Observable.throw(err));             
  }
  getAllPublicacoes(): Observable<any[]>{       
    return this.http.get(URL+'/publicacao')  
    .map((response) => response.json()).catch(err=> Observable.throw(err));             
  }

}  