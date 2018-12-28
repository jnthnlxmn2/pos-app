var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from './user.service';
var AuthService = /** @class */ (function () {
    function AuthService(http, storage, globalservice, userservice) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.globalservice = globalservice;
        this.userservice = userservice;
        this.me = {};
        this.api = this.globalservice.getAPI();
        this.userservice.getMe().then(function (response) {
            var data = response;
            if (data.data) {
                _this.me = data.data;
                console.log(_this.me);
            }
        });
    }
    AuthService.prototype.ngOnInit = function () {
        console.log;
        this.api = this.globalservice.getAPI();
    };
    AuthService.prototype.doLogin = function (email, password) {
        var _this = this;
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        var param = JSON.stringify({
            email: email,
            password: password,
        });
        return new Promise(function (resolve) {
            _this.http.post(_this.api + "/api/login", param, httpOptions)
                .subscribe(function (response) {
                console.log(response, "Token");
                var data = response;
                if (data.success) {
                    _this.storage.store('token', data.success.token);
                    _this.userservice.getMe().then(function (response) {
                        var data = response;
                        if (data.data) {
                            _this.me = data.data;
                            console.log(_this.me);
                            location.reload();
                        }
                    });
                }
                resolve(response);
            }, function (err) {
                resolve(err);
            });
        });
    };
    AuthService.prototype.changePassword = function (password) {
        var _this = this;
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        };
        var param = JSON.stringify({
            new_password: password
        });
        return new Promise(function (resolve) {
            _this.http.post(_this.api + "/api/me/change-password", param, httpOptions)
                .subscribe(function (response) {
                console.log(response, "Token");
                var data = response;
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    AuthService.prototype.getToken = function () {
        return this.storage.retrieve("token");
    };
    AuthService.prototype.isLoggednIn = function () {
        return this.getToken() !== null;
    };
    AuthService.prototype.isAdmin = function () {
        console.log(this.me);
        if (this.me.user_type_id == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.logout = function () {
        this.storage.clear();
        this.me = {};
        location.reload();
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, LocalStorageService, GlobalService, UserService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map