import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PublicationService } from '../publication.service';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.css']
})
export class PublicationViewComponent implements OnInit {
  publicacao : any;

  constructor(private route: ActivatedRoute, private location: Location, 
      private publicacaoService: PublicationService) {}
  ngOnInit() {
    this.getPublicacao();
  }

  getPublicacao(): void {
    this.route.params.subscribe(params => {
      console.log("Visualização publicação de id:"+params['id']);
      this.publicacaoService.findById(params['id']).subscribe(data => this.publicacao = data);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
