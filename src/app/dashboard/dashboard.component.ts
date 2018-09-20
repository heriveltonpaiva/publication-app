import { Component, OnInit } from '@angular/core';
import { MessageService } from '../core/messages/message.service';
import { PublicService } from '../public/public.service';
import { AbstractComponent } from '../core/arq/abstract.component';

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
    this.publicService.getAllCategoria().subscribe(data => this.categorias =  data);
    this.publicService.getAllPublicacoes().subscribe(data => this.collection = data);
  }

}
