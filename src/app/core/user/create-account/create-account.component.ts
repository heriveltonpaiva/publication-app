import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreateAccountService } from './create-account-service';
import { MessageService } from '../../messages/message.service';
import { MessageType } from '../../messages/message.type.enum';

@Component({
  selector: 'app-user',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit{
  form = new FormGroup({
    name: new FormControl(),
    login: new FormControl(),
    password: new FormControl(),
    email: new FormControl()
  });
  constructor(private service: CreateAccountService, private messageService: MessageService) {}
  ngOnInit() {}
  salvar(){
    this.service.createUserAccount(this.form.value).subscribe(retorno => {
      this.messageService.add(MessageType.SUCCESS, 'Conta de Usuário cadastrada com sucesso!')
      this.form.reset()
    }, error => this.messageService.add(MessageType.ERROR, error));
  }
}
