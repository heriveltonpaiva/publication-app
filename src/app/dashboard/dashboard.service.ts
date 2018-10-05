import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { Http } from '@angular/http';

const URL = 'http://localhost:3000/api/public';

@Injectable()  
export class DashboardService{  
  
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
  getAllPagination(page):Observable<any[]>{       
    return this.http.get(URL+'/publicacao/'+page)  
    .map((response) => response.json()).catch(err=> Observable.throw(err));             
  }
  findPublicacaoById(id):Observable<any[]>{   
    return this.http.get(URL+'/publicacao/byId/'+id)  
    .map((response) => response).catch(err=> Observable.throw(err));                
  }
  
}  