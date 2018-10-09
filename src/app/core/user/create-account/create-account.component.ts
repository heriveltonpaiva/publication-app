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
    email: new FormControl(),
    codigo: new FormControl()
  });
  constructor(private service: CreateAccountService, private messageService: MessageService) {}
  ngOnInit() {}
  salvar(){
    this.messageService.clear();
    this.validateInputs();
    if(this.messageService.getAllMessages().length > 0)
       return null;
    if(this.form.value.codigo == 'publicationApp2018'){
      this.service.createUserAccount(this.form.value).subscribe(retorno => {
        this.messageService.add(MessageType.SUCCESS, 'Conta de Usuário cadastrada com sucesso!')
        this.form.reset()
      }, error => this.messageService.add(MessageType.ERROR, error));
    }else{
      this.messageService.add(MessageType.ERROR, 'Código de Autenticação Incorreto, entre em contato com o administrador.')
    }
  }

  validateInputs() {
    this.validateNotNull('Nome', this.form.value.name);
    this.validateNotNull('Login', this.form.value.login);
    this.validateNotNull('Senha', this.form.value.password);
    this.validateNotNull('E-mail', this.form.value.login);
    this.validateNotNull('Código de Autenticação', this.form.value.codigo);
  };

  /* Valida obrigatoriedade do campo */
  validateNotNull(inputName: String, input) {
    if (input == null || input == '') {
      this.messageService.add(MessageType.ERROR, inputName + ': Campo obrigatório não informado.')
    }
  }
}
