import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { AbstractComponent } from '../arq/abstract.component';
import { CategoryService } from '../../category/category-service';
 
@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html'
})
export class MessageComponent extends AbstractComponent {
  constructor(public service: CategoryService) {
    super(service)
  }
  ngOnInit() {}
}