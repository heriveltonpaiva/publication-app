import { Component, OnInit } from '@angular/core';
import { MessageService } from '../core/messages/message.service';
import { PublicService } from '../public/public.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categorias;

  constructor(private publicService: PublicService) { 
    
  }

  ngOnInit() {
    this.publicService.getAllCategoria().subscribe(data => this.categorias =  data);
  }

}
