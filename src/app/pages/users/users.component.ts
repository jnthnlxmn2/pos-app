import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import * as Moment from 'moment'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  p: number = 1;
  users:any=[];

  constructor(public userservice: UserService) { }

  ngOnInit() {
    this.userservice.getUsers().then(response=>{
    let data:any = response;
    if(data.data){
      this.users = data.data.data;
      console.log(this.users,"USERS")
    }
    })
  }
  showDate(date) {
    return Moment(date).format('ll');
  }

}
