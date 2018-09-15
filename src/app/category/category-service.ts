import { Injectable } from '@angular/core';   
import {Http,Response } from '@angular/http';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
  
@Injectable()  
export class CategoryService {  
  
  constructor(private http: Http) { }  
  save(categoria): Observable<any[]>{      
    return this.http.post('http://localhost:3000/api/categoria/save/', categoria)
    .map(response => response.json()).catch(err=> Observable.throw(err));
  }  
  
  update(categoria){   
    return this.http.put('http://localhost:3000/api/categoria/update/'+categoria.id, categoria)  
    .map(response => response.json()).catch(err=> Observable.throw(err));              
  } 

  getAll(): Observable<any[]>{       
    return this.http.get('http://localhost:3000/api/categoria/')  
    .map(response => response.json()).catch(err=> Observable.throw(err));             
  }

  delete(id){   
    return this.http.delete('http://localhost:3000/api/categoria/delete/'+id)  
    .map(response => response.json()).catch(err=> Observable.throw(err));              
  }  

  findById(id){   
    return this.http.get('http://localhost:3000/api/categoria/'+id)  
    .map(response => response.json()).catch(err=> Observable.throw(err));             
  }  
  
}  