import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../arq/abstract.component';
import { UserService } from '../user.service';
import { MessageService } from '../../messages/message.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends AbstractComponent {
  form = new FormGroup({});
  constructor(service: UserService, messageService: MessageService) {
    super(service, messageService)
   }

  ngOnInit() {
    this.setPagination(true);
    this.carregarListagem(1);
  }

}
