import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/api/publicacao';

@Injectable()  
export class PublicationService {  
  
  constructor(private http: HttpClient) { }  
  save(publicacao):Observable<any[]>{      
    return this.http.post(URL+'/save/', publicacao)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));
  }  
  update(publicacao):Observable<any[]>{   
    return this.http.put(URL+'/update/'+publicacao.id, publicacao)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));                
  } 
  getAll(): Observable<any[]>{       
    return this.http.get(URL)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }
  findById(id):Observable<any[]>{   
    return this.http.get(URL+'/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));                
  }  
  delete(id):Observable<any[]>{   
    return this.http.delete(URL+'/delete/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));                
  }  

  findByAssunto(id):Observable<any[]>{
    return this.http.get(URL+'/byAssunto/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));  
  }

}  