import {Injectable, Injector} from '@angular/core';
import {LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, Event, NavigationError } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as StackTraceParser from 'error-stack-parser';

@Injectable()
export class ErrorsService {

  constructor(
    public injector: Injector,
    public router: Router,
  ) {
    // Subscribe to the NavigationError
    this.router
          .events  
          .subscribe((event: Event) => { 
            if (event instanceof NavigationError) {
                // Redirect to the ErrorComponent
                this.log(event.error)
                        .subscribe((errorWithContext) => { 
                          this.router.navigate(['/error'], { queryParams: errorWithContext })
                        });                
            }
          });
  }

  log(error) {
    // Log the error to the console
    //console.error(error);
    // Send error to server
    const errorToSend = this.addContextInfo(error);
    return fakeHttpService.post(errorToSend);
  }

  addContextInfo(error) {
    // You can include context details here (usually coming from other services: UserService...)
    const name = error.name || null;
    const appId = 'app-publication';
    const user = 'User';
    const time = new Date().getTime();
    const id = `${appId}-${user}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || error.statusText;
    const message = error.message || error.toString();
    
    const stack = (error instanceof HttpErrorResponse ? null : error._body != null ? error._body : error.body == null ? StackTraceParser.parse(error) : null);

    const errorWithContext = {name, appId, user, time, id, url, status, message, stack};
    return errorWithContext;
  }
  
  tratarException(error){
    this.router.navigate(['/error'], { queryParams: this.addContextInfo(error)})
  }
}

class fakeHttpService {
  static post(error): Observable<any> {
    return Observable.of(error);
  }
}
