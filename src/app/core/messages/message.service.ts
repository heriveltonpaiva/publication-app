import { Injectable, Injector } from '@angular/core';
import { ErrorsService } from '../error-exception/error-exception-service';
import { Router } from '@angular/router';
 
@Injectable()
export class MessageService extends ErrorsService{

  constructor(injector: Injector, router: Router){
    super(injector, router);
  }

  messages: Object[] = [];
  add(tipo:number, message: String) {
    var mensagem = {
      tipo:tipo, 
      texto:message, 
      style: tipo == 1?'alert alert-sucess':tipo==2?'alert alert-info':'alert alert-danger'
    }
    this.messages.push(mensagem);
  }
  clear() {this.messages = [];}

  getAllMessages(){
    return this.messages;
  }

  redirectPage(urlPage){
    this.router.navigateByUrl(urlPage);
  }
}