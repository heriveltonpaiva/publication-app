import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  usuario : any;

  constructor(private route: ActivatedRoute, private location: Location, 
      private usuarioService: UserService) {}
  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(): void {
    this.route.params.subscribe(params => {
      this.usuarioService.findById(params['id']).subscribe(data => this.usuario = data);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
