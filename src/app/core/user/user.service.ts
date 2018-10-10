import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { AbstractService } from '../arq/abstract.service';
import { HttpClient } from '@angular/common/http';
import { ConfigURL } from '../authentication/config-url';

const URL = ConfigURL.SERVER_URL+'/usuario';

@Injectable()  
export class UserService implements AbstractService{   
  constructor(private http: HttpClient) { }  
 
  getAllPagination(page):Observable<any[]>{       
    return this.http.get(URL+'/'+page)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }
  findById(id):Observable<any[]>{   
    return this.http.get(URL+'/byId/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));                
  } 
  update(obj):Observable<any[]>{   
    return this.http.put(URL+'/update/'+obj.id, obj)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));                
  }

  save(obj): Observable<any[]>{return null;}
  delete(id):Observable<any[]>{return null}; 
  updatePublicArea(obj):Observable<any[]>{return null};
  getAll():Observable<any[]>{return null};
  findByUser():Observable<any[]>{return null};

}  