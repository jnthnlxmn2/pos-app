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
var FileService = /** @class */ (function () {
    function FileService(http, storage, globalservice) {
        this.http = http;
        this.storage = storage;
        this.globalservice = globalservice;
        this.api = '';
        this.api = globalservice.getAPI();
    }
    FileService.prototype.getFileCategory = function () {
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
    FileService.prototype.addFileCategory = function (params) {
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
            _this.http.post(api + "/api/admin/category", params, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    FileService.prototype.deleteFileCategory = function (id) {
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
            _this.http.delete(api + "/api/admin/category/" + id, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    FileService.prototype.updateFileCategory = function (id, params) {
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
            _this.http.put(api + "/api/admin/category/" + id, params, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    FileService.prototype.deleteFile = function (id) {
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
            _this.http.delete(api + "/api/admin/file/" + id, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    FileService.prototype.getFilesByCategory = function (id) {
        var _this = this;
        if (id === void 0) { id = 0; }
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return new Promise(function (resolve) {
            _this.http.get(_this.api + "/api/me/file/" + id + "/category", httpOptions)
                .subscribe(function (response) {
                var data = response;
                if (data) {
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
    FileService.prototype.uploadFile = function (file) {
        var _this = this;
        var formData = new FormData();
        formData.append('file', file.file);
        formData.append('name', file.name);
        formData.append('file_category_id', file.file_category_id);
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                'mimeType': 'multipart/form-data',
            })
        };
        return new Promise(function (resolve) {
            var api = _this.globalservice.getAPI();
            _this.http.post(api + "/api/me/file-upload", formData, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    FileService.prototype.editFile = function (id, params) {
        var _this = this;
        var formData = new FormData();
        if (params.file) {
            formData.append('file', params.file);
        }
        if (params.name) {
            formData.append('name', params.name);
        }
        if (params.file_category_id) {
            formData.append('file_category_id', params.file_category_id);
        }
        var token = this.storage.retrieve('token');
        var httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                'mimeType': 'multipart/form-data',
            })
        };
        return new Promise(function (resolve) {
            var api = _this.globalservice.getAPI();
            _this.http.post(api + "/api/admin/edit-file-upload/" + id, formData, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                resolve(err);
            });
        });
    };
    FileService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, LocalStorageService, GlobalService])
    ], FileService);
    return FileService;
}());
export { FileService };
//# sourceMappingURL=file.service.js.map