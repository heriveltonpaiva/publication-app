import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../authentication/token-storage';
import { MessageService } from '../messages/message.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  form = new FormGroup({
    logado: new FormControl()
  });
  constructor(private token: TokenStorage, private messageService:MessageService, private router: Router) {}

  ngOnInit() {
    this.form.value.logado = localStorage.getItem('token') != null;
  }

  logout(){
    this.form.value.logado = localStorage.getItem('token') != null;
    if(this.form.value.logado){
      this.token.signOut();   
      this.messageService.add(3, 'Logout realizado com sucesso.');
      this.router.navigateByUrl('login');
    }else{
      this.router.navigateByUrl('login');
    }
  }

}
