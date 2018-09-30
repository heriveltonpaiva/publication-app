import { Component } from '@angular/core';
import { MessageService } from '../core/messages/message.service';
import { AbstractComponent } from '../core/arq/abstract.component';
import { PublicService } from './public.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AbstractComponent  {

  categorias;

  constructor(private publicService: PublicService, messageService: MessageService) { 
    super(publicService, messageService);
  }
  
  ngOnInit() {
    this.publicService.getAllCategoria().subscribe(data => this.categorias = data);
    this.publicService.getAllPagination(1).subscribe(lista => {
      this.pagination.setItems(lista);
      this.collection = this.pagination.getItems()
    });
  }
}