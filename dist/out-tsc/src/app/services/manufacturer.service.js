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
import { LocalStorageService } from 'ngx-webstorage';
import { GlobalService } from './global.service';
var ManufacturerService = /** @class */ (function () {
    function ManufacturerService(http, storage, globalservice) {
        this.http = http;
        this.storage = storage;
        this.globalservice = globalservice;
        this.api = '';
        this.api = globalservice.getAPI();
    }
    ManufacturerService.prototype.addManufacturer = function (params) {
        var _this = this;
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        };
        return new Promise(function (resolve) {
            var api = _this.globalservice.getAPI();
            _this.http.post(api + "/api/admin/manufacturer", params, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ManufacturerService.prototype.getManufacturer = function () {
        var _this = this;
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise(function (resolve) {
            _this.http.get(_this.api + "/api/admin/manufacturer/", httpOptions)
                .subscribe(function (response) {
                var data = response;
                if (data.data) {
                    resolve(data.data);
                }
                else {
                    resolve(response);
                }
            }, function (err) {
                resolve(err);
            });
        });
    };
    ManufacturerService.prototype.deleteManufacturer = function (id) {
        var _this = this;
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        };
        return new Promise(function (resolve) {
            var api = _this.globalservice.getAPI();
            _this.http.delete(api + "/api/admin/manufacturer/" + id, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ManufacturerService.prototype.updateManufacturer = function (id, params) {
        var _this = this;
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        };
        return new Promise(function (resolve) {
            var api = _this.globalservice.getAPI();
            _this.http.put(api + "/api/admin/manufacturer/" + id, params, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    ManufacturerService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, LocalStorageService, GlobalService])
    ], ManufacturerService);
    return ManufacturerService;
}());
export { ManufacturerService };
//# sourceMappingURL=manufacturer.service.js.map