import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';

const URL = 'http://localhost:3000/api/fileupload';

@Injectable()  
export class FileUploadService{  
  
  constructor(private http: HttpClient) {}
  
  getFileBase64(file): Observable<any[]>{      
    return this.http.post(URL, file)
    .map((response:any) => response).catch(err=>  Observable.throw(err));
  } 

}