import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userservice: UserService, private spinner: NgxSpinnerService) { }
  password: any = '';
  name: any = '';
  email: any = '';
  confirmpassword: any = '';
  ngOnInit() {
  }

  register() {
    this.spinner.show()
    let params = {
      name: this.name,
      email: this.email,
      password: this.password,
      c_password: this.confirmpassword
    }
    this.userservice.register(params).then(response => {
      let data: any = response;
      if (data.success) {
        this.name = '';
        this.email = '';
        this.password='';
        this.confirmpassword ='';
        swal({
          type: 'success',
          title: 'Success!',
          text: 'close',
        });
        this.ngOnInit();
        this.spinner.hide();
      }else {

        this.spinner.hide();
        swal({
          type: 'warning',
          title: 'Error!',
          text: 'close',
        });


      }

    })
  }

}
