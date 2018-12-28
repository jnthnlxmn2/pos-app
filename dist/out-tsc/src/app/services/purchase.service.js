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
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
var PurchaseService = /** @class */ (function () {
    function PurchaseService(http, storage, globalservice) {
        this.http = http;
        this.storage = storage;
        this.globalservice = globalservice;
        this.api = '';
        this.api = globalservice.getAPI();
    }
    PurchaseService.prototype.purchase = function (params, discount_code, amount_paid) {
        var _this = this;
        var message_ref = new Date();
        var object = {
            items: params,
            code: message_ref.getTime(),
            discount_code: discount_code ? discount_code : null,
            amount_paid: amount_paid
        };
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        };
        return new Promise(function (resolve) {
            var api = _this.globalservice.getAPI();
            _this.http.post(api + "/api/admin/genpurchase", object, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    PurchaseService.prototype.getPurchase = function () {
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
            _this.http.get(api + "/api/admin/purchase_with_details", httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    PurchaseService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, LocalStorageService, GlobalService])
    ], PurchaseService);
    return PurchaseService;
}());
export { PurchaseService };
//# sourceMappingURL=purchase.service.js.map