import { Injectable, Injector } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { AbstractService } from '../core/arq/abstract.service';
import { MessageService } from '../core/messages/message.service';
import { Router } from '@angular/router';

const URL = 'http://localhost:3000/api/categoria';

@Injectable()  
export class CategoryService extends MessageService implements AbstractService{  
  
  constructor(private http: HttpClient, router: Router, injector: Injector) {
    super(injector, router);
  }  
  save(categoria): Observable<any[]>{      
    return this.http.post(URL+'/save/', categoria)
    .map((response:Response) => response).catch(err=> Observable.throw(err));
  }  
  
  update(categoria):Observable<any[]>{   
    return this.http.put(URL+'/update/'+categoria.id, categoria)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  } 

  getAll():Observable<any[]>{       
    return this.http.get(URL)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  delete(id):Observable<any[]>{   
    return this.http.delete(URL+'/delete/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  }  

  findById(id){   
    return this.http.get(URL+'/'+id)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }  
  
}  