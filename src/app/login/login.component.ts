import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication/authentication-service';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorage } from '../core/authentication/token-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthenticationService, private router: Router, private token: TokenStorage) { }

  ngOnInit() {
  }

  login() {
    const val = this.form.value;
    if (val.login && val.password) {
        this.authService.login(val.login, val.password)
            .subscribe(res => {
                    this.token.saveToken(res);
                    this.router.navigateByUrl('/');
                }, error => console.log(error)
            );
    }
}

}
