import { Injectable } from '@angular/core';   
import {Http,Response } from '@angular/http';   

import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
import { Observable } from 'rxjs/Observable';
  
@Injectable()  
export class CategoryService {  
  
  constructor(private http: Http) { }  
  save(categoria){      
    return this.http.post('http://localhost:3000/api/categoria/save/', categoria)  
            .map((response: Response) =>response.json())
  }  
  
  update(categoria){   
    return this.http.put('http://localhost:3000/api/categoria/update/'+categoria.id, categoria)  
          .map((response: Response) =>response.json())               
  } 

  getAll(): Observable<any[]>{       
    return this.http.get('http://localhost:3000/api/categoria/')  
          .map((response: Response) => response.json())              
  }

  delete(id){   
    return this.http.delete('http://localhost:3000/api/categoria/delete/'+id)  
          .map((response: Response) =>response.json())               
  }  
  
}  