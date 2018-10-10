import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { Http } from '@angular/http';
import { ConfigURL } from '../../authentication/config-url';

const URL = ConfigURL.SERVER_URL+'/public';

@Injectable()  
export class CreateAccountService{  
  constructor(private http: Http) {}  

  createUserAccount(obj):Observable<any[]>{
    return this.http.post(URL+'/usuario', obj)  
    .map((response) => response.json()).catch(err=> Observable.throw(err));   
  }

}  