import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { AbstractComponent } from '../../arq/abstract.component';
import { MessageService } from '../../messages/message.service';
import { TokenStorage } from '../../authentication/token-storage';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent extends AbstractComponent implements OnInit {
  usuario : any;
  constructor(usuarioService: UserService, messageService: MessageService, 
    private location: Location, private token:TokenStorage) {
        super(usuarioService, messageService);
        this.getUsuario(); 
  }
  ngOnInit() {this.getUsuario();}

  getUsuario(): void {
    if(this.token.isAuthenticated){
      this.usuario = this.getUsuarioLogado();
    }
  }
  goBack(): void {
    this.location.back();
  }
}
