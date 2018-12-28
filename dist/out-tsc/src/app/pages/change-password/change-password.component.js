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
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(userservice, auth) {
        this.userservice = userservice;
        this.auth = auth;
        this.newpassword = '';
        this.oldpassword = '';
        this.confirmnewpassword = '';
        this.me = {};
        this.promt = '';
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userservice.getMe().then(function (response) {
            var data = response;
            _this.me = data.data;
        });
    };
    ChangePasswordComponent.prototype.submit = function () {
        var _this = this;
        this.auth.doLogin(this.me.email, this.oldpassword).then(function (response) {
            var data = response;
            if (data.success) {
                if (_this.newpassword == _this.confirmnewpassword) {
                    _this.auth.changePassword(_this.newpassword).then(function (response) {
                        console.log(response, "Changed!");
                    });
                }
                else {
                    _this.promt = 'Password did not match !';
                    setTimeout(function () {
                        _this.promt = '';
                    }, 5000);
                }
            }
            else {
                _this.promt = 'Wrong Password !';
                setTimeout(function () {
                    _this.promt = '';
                }, 5000);
            }
        });
    };
    ChangePasswordComponent = __decorate([
        Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html',
            styleUrls: ['./change-password.component.css']
        }),
        __metadata("design:paramtypes", [UserService, AuthService])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
export { ChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map