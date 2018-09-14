import { Injectable } from '@angular/core';   
import {Http,Response } from '@angular/http';   

import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
import { Observable } from 'rxjs/Observable';
  
@Injectable()  
export class TopicService {  
  
  constructor(private http: Http) { }  
  save(assunto){      
    return this.http.post('http://localhost:3000/api/assunto/save/', assunto)  
            .map((response: Response) =>response.json())
  }  
  
  update(assunto){   
    return this.http.put('http://localhost:3000/api/assunto/update/'+assunto.id, assunto)  
          .map((response: Response) =>response.json())               
  } 

  getAll(): Observable<any[]>{       
    return this.http.get('http://localhost:3000/api/assunto/')  
          .map((response: Response) => response.json())              
  }

  getAllCategorias(): Observable<any[]>{       
    return this.http.get('http://localhost:3000/api/categoria/')  
          .map((response: Response) => response.json())              
  }

  
  findByAssuntoByCategoria(id){       
    return this.http.get('http://localhost:3000/api/assunto/byCategoria/'+id)  
          .map((response: Response) => response.json())              
  }

  delete(id){   
    return this.http.delete('http://localhost:3000/api/assunto/delete/'+id)  
          .map((response: Response) =>response.json())               
  }  
  
}  