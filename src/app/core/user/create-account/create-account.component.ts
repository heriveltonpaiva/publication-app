import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreateAccountService } from './create-account-service';

@Component({
  selector: 'app-user',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  form = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  });
  constructor(private service: CreateAccountService) { }

  ngOnInit() {
  }

  salvar(){
    this.service.createUserAccount(this.form);
  }
}
