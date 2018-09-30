import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { Http } from '@angular/http';

const URL = 'http://localhost:3000/api/public/';

@Injectable()  
export class UserService{  
  
  constructor(private http: Http) { }  
 
  getAllPagination(page):Observable<any[]>{       
    return this.http.get(URL+'/user/'+page)  
    .map((response) => response.json()).catch(err=> Observable.throw(err));             
  }

  save(obj): Observable<any[]>{return null;}

  update(obj):Observable<any[]>{return null;}

  delete(id):Observable<any[]>{return null};

  findById(id):Observable<any[]>{return null}

}  