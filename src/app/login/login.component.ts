import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication/authentication-service';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorage } from '../core/authentication/token-storage';
import { ErrorsService } from '../core/error-exception/error-exception-service';
import { MessageService } from '../core/messages/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthenticationService, private errorService:ErrorsService, 
    private router: Router, private token: TokenStorage, private messageService:MessageService) { }

  ngOnInit() {
  }

  login() {
    const val = this.form.value;
    if (val.login && val.password) {
        this.authService.login(val.login, val.password)
            .subscribe(res => {
              if(res){
                    this.token.saveToken(res);
                    this.router.navigateByUrl('/');
              }else{
                this.messageService.add(2, 'Usuário ou Senha incorretos.');
              }
      }, error => this.errorService.tratarException(error));      
    }
 }
 logout(){
   this.token.signOut();   
 }

}
