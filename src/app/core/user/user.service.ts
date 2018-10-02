import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { AbstractService } from '../arq/abstract.service';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/api/usuario/';

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

  save(obj): Observable<any[]>{return null;}
  update(obj):Observable<any[]>{return null;}
  delete(id):Observable<any[]>{return null}; 
  updatePublicArea(obj):Observable<any[]>{return null};
  getAll():Observable<any[]>{return null};

}  