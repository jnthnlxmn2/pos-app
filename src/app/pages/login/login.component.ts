import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  promt: string = "";
  constructor(public auth: AuthService, private spinner: NgxSpinnerService,public router: Router,public storage: LocalStorageService) {

  }

  ngOnInit() {
    if(this.storage.retrieve('token')){
      this.router.navigate(['/']);
    }
  }
  login() {
    this.spinner.show();
    this.auth.doLogin(this.email, this.password).then(response => {
      let data: any = response;
      if (data.success) {
        this.spinner.hide();
        this.router.navigate(['/']);
      }
      else if (data.error) {
        this.spinner.hide();
        this.promt = data.error.error;
        setTimeout(() => {
          this.promt = "";
        }, 3000)
      }
    })
  }

}
