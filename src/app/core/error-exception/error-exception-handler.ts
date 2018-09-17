import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorsService } from './error-exception-service';
import { NotificationService } from '../http-utils/notification-service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    
   constructor(private injector: Injector) { }
   
   handleError(error: Error | HttpErrorResponse) {
    console.log('Errors Handler in action!')
    const notificationService = this.injector.get(NotificationService);
    const errorsService = this.injector.get(ErrorsService);
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
        // Server or connection error happened
        if (!navigator.onLine) {
          // Handle offline error
          return notificationService.notify('No Internet Connection');
        } else {
          // Handle Http Error (error.status === 403, 404...)
           // Http Error
        if(error.status == 401){
           localStorage.removeItem('token');
           router.navigateByUrl('login');
        }
        // Send the error to the server
          errorsService.log(error).subscribe();
          return notificationService.notify(`${error.status} - ${error.message}`);
        }
     } else {
       // Handle Client Error (Angular Error, ReferenceError...)
       
       // Client Error Happend
      // Send the error to the server and then
      // redirect the user to the page with all the info
        error.message = error.message.split('?')[0]
        console.log(error.message);
        errorsService.log(error).subscribe(errorWithContextInfo => {
        router.navigate(['/error'], { queryParams: errorWithContextInfo });
      });
     }
  }
}