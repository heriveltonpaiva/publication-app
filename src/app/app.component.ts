import { Component, Input } from '@angular/core';
import { MessageService } from './core/messages/message.service';
import { NotificationService } from './core/http-utils/notification-service';
import { HttpService } from './core/http-utils/http-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  notification: string;
  showNotification: boolean;
  constructor(public messageService: MessageService, private notificationService: NotificationService, private httpService: HttpService) {}
  ngOnInit() {
    this.notificationService
            .notification$
            .subscribe(message => { 
              this.notification = message;
              this.showNotification = true;
            });
  }

}
