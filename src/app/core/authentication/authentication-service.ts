import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ConfigURL } from "./config-url";

const URL = ConfigURL.SERVER_URL

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {}
    login(login:string, password:string): Observable<any[]>{              
        return this.http.post(URL+'/generate-token/', {login, password})
        .map((response: any) => response).catch(err=> Observable.throw(err));
      }  
    
    
}
          