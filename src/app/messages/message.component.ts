import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
 
@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  constructor(public messageService: MessageService) {}
  ngOnInit() {}
}