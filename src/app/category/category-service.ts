import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
  
@Injectable()  
export class CategoryService {  
  
  constructor(private http: HttpClient) { }  
  save(categoria): Observable<any[]>{      
    return this.http.post('http://localhost:3000/api/categoria/save/', categoria)
    .map((response:Response) => response).catch(err=> Observable.throw(err));
  }  
  
  update(categoria):Observable<any[]>{   
    return this.http.put('http://localhost:3000/api/categoria/update/'+categoria.id, categoria)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));              
  } 

  getAll():Observable<any[]>{       
    return this.http.get('http://localhost:3000/api/categoria')  
    .map((response:Response) => response).catch(err=> Observable.throw(err));             
  }

  delete(id):Observable<any[]>{   
    return this.http.delete('http://localhost:3000/api/categoria/delete/'+id)  
    .map((response:Response) => response.json()).catch(err=> Observable.throw(err));              
  }  

  findById(id){   
    return this.http.get('http://localhost:3000/api/categoria/'+id)  
    .map((response:Response) => response.json()).catch(err=> Observable.throw(err));             
  }  
  
}  