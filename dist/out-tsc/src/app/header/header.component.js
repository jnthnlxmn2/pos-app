var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../services/user.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authservice, router, storage, userservice) {
        this.authservice = authservice;
        this.router = router;
        this.storage = storage;
        this.userservice = userservice;
        this.collapsed = true;
        this.isMobile = false;
        this.paths = [{ name: 'Purchase', path: 'purchase' }, { name: 'Purchase List', path: 'purchase-list' }, { name: 'Logs', path: 'logs' }];
        this.userservice.getMe().then(function (response) {
            var data = response;
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
        });
    }
    HeaderComponent.prototype.toggleCollapsed = function () {
        this.collapsed = !this.collapsed;
    };
    HeaderComponent.prototype.ngOnInit = function () {
        console.log("test");
        if (typeof window.orientation !== 'undefined') {
            this.isMobile = true;
            console.log(this.isMobile, "US");
        }
    };
    HeaderComponent.prototype.navigate = function (path) {
        this.router.navigate(['/' + path]);
    };
    HeaderComponent.prototype.logout = function () {
        this.authservice.logout();
        this.router.navigate(["/login"]);
    };
    HeaderComponent.prototype.changepassword = function () {
        this.router.navigate(["/change-password"]);
    };
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        __metadata("design:paramtypes", [AuthService, Router, LocalStorageService, UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map