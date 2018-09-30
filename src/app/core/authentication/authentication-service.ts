import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {}
    login(login:string, password:string): Observable<any[]>{              
        return this.http.post('http://localhost:3000/api/generate-token/', {login, password})
        .map((response: any) => response).catch(err=> Observable.throw(err));
      }  
    
    
}
          