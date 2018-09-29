import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { AbstractService } from '../core/arq/abstract.service';

const URL = 'http://localhost:3000/api/public/';

@Injectable()  
export class PublicService implements AbstractService{  
  
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

  getAll(): Observable<any[]>{return null}

  getAllPagination(page):Observable<any[]>{       
    return this.http.get(URL+'/publicacao/'+page)  
    .map((response) => response.json()).catch(err=> Observable.throw(err));             
  }

  save(obj): Observable<any[]>{return null;}

  update(obj):Observable<any[]>{return null;}

  updatePublicArea(obj):Observable<any[]>{return null};

  delete(id):Observable<any[]>{return null};

  findById(id):Observable<any[]>{return null}

}  