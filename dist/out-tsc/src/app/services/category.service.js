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
var CategoryService = /** @class */ (function () {
    function CategoryService(http, storage, globalservice) {
        this.http = http;
        this.storage = storage;
        this.globalservice = globalservice;
        this.api = '';
        this.api = globalservice.getAPI();
    }
    CategoryService.prototype.getFileCategory = function () {
        var _this = this;
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise(function (resolve) {
            _this.http.get(_this.api + "/api/admin/category/", httpOptions)
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
    CategoryService.prototype.getSubCategory = function () {
        var _this = this;
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise(function (resolve) {
            _this.http.get(_this.api + "/api/admin/subcategory/", httpOptions)
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
    CategoryService.prototype.addSubCategory = function (params) {
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
            _this.http.post(api + "/api/admin/subcategory", params, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    CategoryService.prototype.deleteSubCategory = function (id) {
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
            _this.http.delete(api + "/api/admin/subcategory/" + id, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    CategoryService.prototype.updateSubCategory = function (id, params) {
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
            _this.http.put(api + "/api/admin/subcategory/" + id, params, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    CategoryService.prototype.getSubCategoryByCategoryId = function (id) {
        var _this = this;
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise(function (resolve) {
            _this.http.get(_this.api + "/api/admin/subcategory_by_category/" + id, httpOptions)
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
    CategoryService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, LocalStorageService, GlobalService])
    ], CategoryService);
    return CategoryService;
}());
export { CategoryService };
//# sourceMappingURL=category.service.js.map