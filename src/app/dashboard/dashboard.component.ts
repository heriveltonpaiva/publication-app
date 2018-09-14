import { Component, OnInit } from '@angular/core';
import { MessageService } from '../core/messages/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private messageService: MessageService) { 
    this.messageService.clear();
  }

  ngOnInit() {
  }

}
