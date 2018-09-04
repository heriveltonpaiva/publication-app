import { Injectable } from '@angular/core';
 
@Injectable()
export class MessageService {
  messages: Object[] = [];
  add(tipo:number, message: String) {
    var mensagem = {
      tipo:tipo, 
      texto:message, 
      style: tipo == 1?'alert alert-sucess':tipo==2?'alert alert-info':'alert alert-danger'
    }
    this.messages.push(mensagem);
    this.clear;
  }
  clear() {this.messages = [];}
}