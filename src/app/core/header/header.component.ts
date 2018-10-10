import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TokenStorage } from '../authentication/token-storage';
import { MessageService } from '../messages/message.service';
import { Router } from '@angular/router';
import { AbstractComponent } from '../arq/abstract.component';
import { User } from '../user/user';
import { PublicationService } from '../../publication/publication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends AbstractComponent{
  usuario = new User();
  constructor(service: PublicationService, messageService:MessageService, private ref: ChangeDetectorRef,
    private router: Router, private tokenStorage: TokenStorage) {
      super(service, messageService);
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
  isAuthenticated(){
    return this.tokenStorage.isAuthenticated();
  }
}
