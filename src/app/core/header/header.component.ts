import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TokenStorage } from '../authentication/token-storage';
import { MessageService } from '../messages/message.service';
import { Router } from '@angular/router';
import { PublicService } from '../../dashboard/public.service';
import { AbstractComponent } from '../arq/abstract.component';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends AbstractComponent{
  usuario = new User();
  constructor(publicService: PublicService, messageService:MessageService, private ref: ChangeDetectorRef,
    private router: Router, private tokenStorage: TokenStorage) {
      super(publicService, messageService);
      this.ref.detach();       
      setInterval(() => {
        this.usuario = this.getUsuarioLogado();
        this.ref.detectChanges();
      }, 1000);  
  
  }

  ngOnInit() {}
  
  logout(){
    if(this.tokenStorage.isAuthenticated()){
      this.messageService.add(3, 'Logout realizado com sucesso.');
      this.router.navigateByUrl('dashboard');
      localStorage.clear();
    }else{
      this.router.navigateByUrl('login');
    }
  }
}
