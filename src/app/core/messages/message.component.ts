import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { AbstractComponent } from '../arq/abstract.component';
import { CategoryService } from '../../category/category-service';
import { TopicService } from '../../topic/topic-service';
import { AbstractService } from '../arq/abstract.service';
import { IfObservable } from 'rxjs/observable/IfObservable';
 
@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html'
})
export class MessageComponent{
      constructor(public service: MessageService) {
  }
  ngOnInit() {}
}