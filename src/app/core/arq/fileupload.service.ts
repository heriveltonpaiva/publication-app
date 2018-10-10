import { Injectable } from '@angular/core';   

import 'rxjs/Rx';  
import {Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { ConfigURL } from '../authentication/config-url';

const URL = ConfigURL.SERVER_URL+'/fileupload';

@Injectable()  
export class FileUploadService{  
  
  constructor(private http: HttpClient) {}
  
  getFileBase64(file): Observable<any[]>{      
    return this.http.post(URL, file)
    .map((response:any) => response).catch(err=>  Observable.throw(err));
  }

  saveArquivo(arquivo):Observable<any[]>{      
    return this.http.post(URL+'/save/', arquivo)  
    .map((response:Response) => response).catch(err=> Observable.throw(err));
  }


}