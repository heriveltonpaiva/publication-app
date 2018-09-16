import { Injectable } from '@angular/core';   
import {Response } from '@angular/http';   

import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
 
const URL = 'http://localhost:3000/api/assunto';

@Injectable()  
export class TopicService {  
  
  constructor(private http: HttpClient) { }  

  save(assunto){      
    return this.http.post(URL+'/save/', assunto)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));
  }  
  
  update(assunto){   
    return this.http.put(URL+'/update/'+assunto.id, assunto)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  } 

  getAll(): Observable<any[]>{       
    return this.http.get(URL)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  getAllCategorias(): Observable<any[]>{       
    return this.http.get('http://localhost:3000/api/categoria/')  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }
  
  findByAssuntoByCategoria(id){       
    return this.http.get(URL+'/byCategoria/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  findById(id){   
    return this.http.get(URL+'/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  }  

  delete(id){   
    return this.http.delete(URL+'/delete/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }  
  
}  