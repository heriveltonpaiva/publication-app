import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class AbstractService {
  
  abstract getAll(): Observable<any[]>;

  abstract save(obj): Observable<any[]>;

  abstract update(obj):Observable<any[]>;

  abstract delete(id):Observable<any[]>;

  abstract findById(id);

  abstract add(tipo:number, message: String);

  abstract tratarException(error);

  abstract redirectPage(page);

  abstract getAllMessages();

  abstract clear();
}