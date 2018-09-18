import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class AbstractService {

  abstract getAll(): Observable<any[]>;

  abstract getAllPagination(page): Observable<any[]>;

  abstract save(obj): Observable<any[]>;

  abstract update(obj):Observable<any[]>;

  abstract updatePublicArea(obj):Observable<any[]>;

  abstract delete(id):Observable<any[]>;

  abstract findById(id);

}