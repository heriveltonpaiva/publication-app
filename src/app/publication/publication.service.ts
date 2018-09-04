import { Injectable } from '@angular/core';   
import {Http,Response } from '@angular/http';   

import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  
  
@Injectable()  
export class PublicationService {  
  
  constructor(private http: Http) { }  
  
  save(publicacao){      
    return this.http.post('http://localhost:3000/api/publicacao/save/', publicacao)  
            .map((response: Response) =>response.json())
  }  
  
  update(publicacao){   
    return this.http.put('http://localhost:3000/api/publicacao/update/'+publicacao.id, publicacao)  
          .map((response: Response) =>response.json())               
  } 

  getAll(){       
    return this.http.get('http://localhost:3000/api/publicacao/')  
          .map((response: Response) => response.json())              
  }

  delete(id){   
    return this.http.delete('http://localhost:3000/api/publicacao/delete/'+id)  
          .map((response: Response) =>response.json())               
  }  
  
}  