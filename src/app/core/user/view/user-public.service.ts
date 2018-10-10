import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { Http } from '@angular/http';
import { ConfigURL } from '../../authentication/config-url';

const URL = ConfigURL.SERVER_URL+'/public/usuario';

@Injectable()  
export class UserPublicService{  
  constructor(private http: Http) { }  

  findById(id):Observable<any[]>{   
    return this.http.get(URL+'/byId/'+id)  
    .map((response) => response).catch(err=> Observable.throw(err));                
  }

}