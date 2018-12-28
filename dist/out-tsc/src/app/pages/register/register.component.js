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
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userservice, spinner) {
        this.userservice = userservice;
        this.spinner = spinner;
        this.password = '';
        this.name = '';
        this.email = '';
        this.confirmpassword = '';
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.spinner.show();
        var params = {
            name: this.name,
            email: this.email,
            password: this.password,
            c_password: this.confirmpassword
        };
        this.userservice.register(params).then(function (response) {
            var data = response;
            if (data.success) {
                _this.name = '';
                _this.email = '';
                _this.password = '';
                _this.confirmpassword = '';
                swal({
                    type: 'success',
                    title: 'Success!',
                    text: 'close',
                });
                _this.ngOnInit();
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                swal({
                    type: 'warning',
                    title: 'Error!',
                    text: 'close',
                });
            }
        });
    };
    RegisterComponent = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [UserService, NgxSpinnerService])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map