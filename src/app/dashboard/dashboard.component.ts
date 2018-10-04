import { Component } from '@angular/core';
import { MessageService } from '../core/messages/message.service';
import { AbstractComponent } from '../core/arq/abstract.component';
import { DashboardService } from './dashboard.service';
import { PublicationService } from '../publication/publication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AbstractComponent  {

  categorias;

  constructor(service:PublicationService, private dashboardService: DashboardService, messageService: MessageService) { 
    super(service, messageService);
  }
  
  ngOnInit() {
    this.dashboardService.getAllCategoria().subscribe(data => this.categorias = data);
    this.dashboardService.getAllPagination(1).subscribe(lista => {
      this.pagination.setItems(lista);
      this.collection = this.pagination.getItems()
    });
  }
}