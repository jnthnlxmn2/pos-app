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
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import * as Moment from 'moment';
import { LocalStorageService } from 'ngx-webstorage';
import { GlobalService } from '../../services/global.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';
var FilesComponent = /** @class */ (function () {
    function FilesComponent(routeparams, fileservice, storage, globalservice, spinner, userservice, router) {
        this.routeparams = routeparams;
        this.fileservice = fileservice;
        this.storage = storage;
        this.globalservice = globalservice;
        this.spinner = spinner;
        this.userservice = userservice;
        this.router = router;
        this.files = [];
        this.access_token = '';
        this.p = 1;
        this.api = '';
        this.me = {};
        this.isMobile = false;
        this.collection = this.files;
    }
    FilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (typeof window.orientation !== 'undefined') {
            this.isMobile = true;
        }
        this.userservice.getMe().then(function (response) {
            var data = response;
            if (data.data) {
                _this.me = data.data;
            }
            console.log(data.data, "ME");
        });
        this.api = this.globalservice.getAPI();
        this.access_token = this.storage.retrieve('token');
        if (this.routeparams.snapshot.params) {
            var category = this.routeparams.snapshot.params;
            this.fileservice.getFilesByCategory(category.id).then(function (response) {
                console.log(response);
                var data = response;
                _this.files = data.data;
            });
        }
        else {
            this.fileservice.getFilesByCategory(0).then(function (response) {
                var data = response;
                _this.files = data.data;
                console.log(response);
            });
        }
    };
    FilesComponent.prototype.showDate = function (date) {
        return Moment(date).format('ll');
    };
    FilesComponent.prototype.delete = function (id) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.fileservice.deleteFile(id).then(function (response) {
                    var data = response;
                    if (data) {
                        swal({
                            type: 'success',
                            title: 'Deleted!',
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
            }
        });
    };
    FilesComponent.prototype.edit = function (file) {
        this.router.navigate(["/add-file", file]);
    };
    FilesComponent = __decorate([
        Component({
            selector: 'app-files',
            templateUrl: './files.component.html',
            styleUrls: ['./files.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, FileService,
            LocalStorageService, GlobalService,
            NgxSpinnerService, UserService, Router])
    ], FilesComponent);
    return FilesComponent;
}());
export { FilesComponent };
//# sourceMappingURL=files.component.js.map