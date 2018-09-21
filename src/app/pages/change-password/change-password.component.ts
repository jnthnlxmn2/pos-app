import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public userservice: UserService,public auth: AuthService) { }
  newpassword:any='';
  oldpassword:any='';
  confirmnewpassword:any='';
  me:any={};
  promt:any='';
  ngOnInit() {
    this.userservice.getMe().then(response=>{
      let data:any = response;
      this.me = data.data;
    })
  }
  submit(){
    this.auth.doLogin(this.me.email, this.oldpassword).then(response => {
      let data: any = response;
      if (data.success) {
        if(this.newpassword == this.confirmnewpassword){
          this.auth.changePassword(this.newpassword).then(response=>{
            console.log(response,"Changed!")
          })
        }else{
          this.promt = 'Password did not match !';
          setTimeout(()=>{
            this.promt='';
          },5000)
        }
      }
      else{
        this.promt = 'Wrong Password !';
        setTimeout(()=>{
          this.promt='';
        },5000)
      }
    })
  }

}
