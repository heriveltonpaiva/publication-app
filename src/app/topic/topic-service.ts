import { Injectable } from '@angular/core';   
import {Response } from '@angular/http';   

import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../core/arq/abstract.service';
import { ConfigURL } from '../core/authentication/config-url';
 
const URL = ConfigURL.SERVER_URL+'/assunto';

@Injectable()  
export class TopicService implements AbstractService{  
  
  constructor(private http: HttpClient) {}   

  save(assunto){      
    return this.http.post(URL+'/save/', assunto)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));
  }  
  
  update(assunto){   
    return this.http.put(URL+'/update/'+assunto.id, assunto)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  } 

  updatePublicArea(assunto):Observable<any[]>{   
    return this.http.put(URL+'/updateAreaPublica/'+assunto.id, assunto)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  }

  getAll(): Observable<any[]>{       
    return this.http.get(URL)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  getAllPagination(page):Observable<any[]>{       
    return this.http.get(URL+'/'+page)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  getAllCategorias(): Observable<any[]>{       
    return this.http.get(ConfigURL.SERVER_URL+'/categoria/')  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }
  
  findByAssuntoByCategoria(id){       
    return this.http.get(URL+'/byCategoria/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  findById(id){   
    return this.http.get(URL+'/byId/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  }  

  delete(id){   
    return this.http.delete(URL+'/delete/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }  

  findByUser():Observable<any[]>{return null};
  
}  