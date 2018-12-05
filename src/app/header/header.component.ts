import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  collapsed = true;
  isMobile = false;
  public paths = [{ name: 'Categories', path: 'categories', sub: [{ name: 'Sub Category', path: 'sub-category' }] }, { name: 'Manufacturer', path: 'manufacturer' },
  { name: 'Items', path: 'items' }, { name: 'Refill', path: 'refill' }, { name: 'Logs', path: 'logs' }];
  constructor(public authservice: AuthService, public router: Router, public storage: LocalStorageService, public userservice: UserService) {
    this.userservice.getMe().then(response => {
      let data: any = response;
      /* if (data.data) {
         if (typeof window.orientation !== 'undefined') {
           if (data.data.user_type_id == 1) {
             this.paths = [{ name: 'Files', path: 'files' }, { name: 'Add file', path: 'add-file' }, { name: 'Categories', path: 'categories' }, { name: 'Register', path: 'register' }, { name: 'Users', path: 'users' }];
           } else {
             this.paths = [{ name: 'Files', path: 'files' }];
           }
         }
         else {
 
           if (data.data.user_type_id == 1) {
             this.paths = [{ name: 'Files', path: 'files' }, { name: 'Add file', path: 'add-file' }, { name: 'Categories', path: 'categories' }, { name: 'Register', path: 'register' }, { name: 'Users', path: 'users' }];
           } else {
             this.paths = [{ name: 'Files', path: 'files' }, { name: 'Add file', path: 'add-file' }];
           }
 
         }
       }*/
    })
  }


  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
    console.log("test")
    if (typeof window.orientation !== 'undefined') {
      this.isMobile = true;
      console.log(this.isMobile, "US")
    }


  }
  navigate(path) {
    this.router.navigate(['/' + path]);
  }
  logout() {
    this.authservice.logout();
    this.router.navigate(["/login"])
  }
  changepassword() {
    this.router.navigate(["/change-password"])
  }

}
