import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { Http } from '@angular/http';

const URL = 'http://localhost:3000/api/public';

@Injectable()  
export class CreateAccountService{  
  constructor(private http: Http) {}  

  createUserAccount(obj):Observable<any[]>{
    return this.http.post(URL+'/usuario', obj)  
    .map((response) => response.json()).catch(err=> Observable.throw(err));   
  }

}  