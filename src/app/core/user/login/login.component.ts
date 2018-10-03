import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication-service';
import { ErrorsService } from '../../error-exception/error-exception-service';
import { TokenStorage } from '../../authentication/token-storage';
import { MessageService } from '../../messages/message.service';
import { User } from '../user';
import { HeaderComponent } from '../../header/header.component';
import { UserService } from '../user.service';
import { PublicService } from '../../../dashboard/public.service';

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

  constructor(private authService: AuthenticationService, private errorService:ErrorsService, private userService:UserService, 
    private router: Router, private token: TokenStorage, private messageService: MessageService, private publicService: PublicService) { 
      
    }

  ngOnInit() {}

  login() {
    const val = this.form.value;
    if (val.login && val.password) {
        this.authService.login(val.login, val.password)
            .subscribe(res => {
              if(res){
                    console.log((<any>res).data)
                    this.token.saveToken((<any>res).token);
                    this.token.saveUser((<any>res).data);
                    this.router.navigateByUrl('/');
              }else{
                this.messageService.add(2, 'Usuário ou Senha incorretos.');
              }
      }, error => this.errorService.tratarException(error));      
    }
 }
 
}
