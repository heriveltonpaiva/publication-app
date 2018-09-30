import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../authentication/token-storage';
import { MessageService } from '../messages/message.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicService } from '../../dashboard/public.service';
import { AbstractComponent } from '../arq/abstract.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends AbstractComponent {
  form = new FormGroup({});
  constructor(publicService:PublicService, messageService:MessageService, private token: TokenStorage, 
    private router: Router, private tokenStorage: TokenStorage) {
      super(publicService, messageService);
    }

  ngOnInit() {}
  logout(){
    if(this.tokenStorage.isAuthenticated()){
      this.token.signOut();   
      this.messageService.add(3, 'Logout realizado com sucesso.');
      this.router.navigateByUrl('dashboard');
    }else{
      this.router.navigateByUrl('login');
    }
  }

}
