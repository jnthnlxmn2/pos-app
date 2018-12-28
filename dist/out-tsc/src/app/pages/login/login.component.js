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
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, spinner, router, storage) {
        this.auth = auth;
        this.spinner = spinner;
        this.router = router;
        this.storage = storage;
        this.promt = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.storage.retrieve('token')) {
            this.router.navigate(['/']);
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.spinner.show();
        this.auth.doLogin(this.email, this.password).then(function (response) {
            var data = response;
            if (data.success) {
                _this.spinner.hide();
                _this.router.navigate(['/']);
            }
            else if (data.error) {
                _this.spinner.hide();
                _this.promt = data.error.error;
                setTimeout(function () {
                    _this.promt = "";
                }, 3000);
            }
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [AuthService, NgxSpinnerService, Router, LocalStorageService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map