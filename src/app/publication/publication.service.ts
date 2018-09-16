import { Injectable } from '@angular/core';   
import {Http,Response } from '@angular/http';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
  
@Injectable()  
export class PublicationService {  
  
  constructor(private http: Http) { }  
  save(publicacao):Observable<any[]>{      
    return this.http.post('http://localhost:3000/api/publicacao/save/', publicacao)  
          .map(response =>response.json()).catch(err=> Observable.throw(err)); 
  }  
  update(publicacao):Observable<any[]>{   
    return this.http.put('http://localhost:3000/api/publicacao/update/'+publicacao.id, publicacao)  
          .map(response =>response.json()).catch(err=> Observable.throw(err));                
  } 
  getAll(): Observable<any[]>{       
    return this.http.get('http://localhost:3000/api/publicacao/')  
          .map(response => response.json()).catch(err=> Observable.throw(err));               
  }
  findById(id):Observable<any[]>{   
    return this.http.get('http://localhost:3000/api/publicacao/'+id)  
          .map(response =>response.json()).catch(err=> Observable.throw(err));                
  }  
  delete(id):Observable<any[]>{   
    return this.http.delete('http://localhost:3000/api/publicacao/delete/'+id)  
          .map(response =>response.json()).catch(err=> Observable.throw(err));                
  }  
  
}  