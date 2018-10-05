import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.css']
})
export class PublicationViewComponent implements OnInit {
  publicacao : any;

  constructor(private route: ActivatedRoute, private location: Location, 
      private dashboardService: DashboardService) {}
  ngOnInit() {
    this.getPublicacao();
  }

  getPublicacao(): void {
    this.route.params.subscribe(params => {
      this.dashboardService.findPublicacaoById(params['id'])
      .subscribe(data => this.publicacao =  JSON.parse((<any>data)._body));
    });
  }

  goBack(): void {
    this.location.back();
  }
}
