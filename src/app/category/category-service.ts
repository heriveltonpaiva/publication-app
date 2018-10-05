import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { AbstractService } from '../core/arq/abstract.service';

const URL = 'http://localhost:3000/api/categoria';

@Injectable()  
export class CategoryService implements AbstractService{  
  
  constructor(private http: HttpClient) {
  }  
  save(categoria): Observable<any[]>{      
    return this.http.post(URL+'/save/', categoria)
    .map((response:Response) => response).catch(err=> Observable.throw(err));
  }  
  
  update(categoria):Observable<any[]>{   
    return this.http.put(URL+'/update/'+categoria.id, categoria)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              

  } 
  updatePublicArea(categoria):Observable<any[]>{   
    return this.http.put(URL+'/updateAreaPublica/'+categoria.id, categoria)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  }

  getAll():Observable<any[]>{       
    return this.http.get(URL)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  getAllPagination(page):Observable<any[]>{       
    return this.http.get(URL+'/'+page)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  delete(id):Observable<any[]>{   
    return this.http.delete(URL+'/delete/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  }  

  findById(id){   
    return this.http.get(URL+'/byId/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }  
  
  findByUser():Observable<any[]>{return null};
}  