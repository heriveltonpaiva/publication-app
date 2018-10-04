import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { AbstractComponent } from '../../arq/abstract.component';
import { MessageService } from '../../messages/message.service';
import { TokenStorage } from '../../authentication/token-storage';
import { UserPublicService } from './user-public.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent extends AbstractComponent implements OnInit {
  usuario : any;
  constructor(usuarioService: UserService, private userPublicService:UserPublicService, messageService: MessageService, 
    private location: Location, private token:TokenStorage, private route: ActivatedRoute) {
        super(usuarioService, messageService);
        this.getUsuario(); 
  }
  ngOnInit() {this.getUsuario();}

  getUsuario(): void {
    this.route.params.subscribe(params => {
      this.userPublicService.findById(params['id'])
      .subscribe(user => {this.usuario = JSON.parse((<any>user)._body)});
    });
  }
  goBack(): void {
    this.location.back();
  }
}
