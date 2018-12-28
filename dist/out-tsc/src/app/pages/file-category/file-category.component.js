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
import { FileService } from '../../services/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
var FileCategoryComponent = /** @class */ (function () {
    function FileCategoryComponent(fileservice, spinner, router) {
        this.fileservice = fileservice;
        this.spinner = spinner;
        this.router = router;
        this.categories = [];
        this.category_name = '';
        this.category_description = '';
        this.activeUpdate = false;
        this.id = '';
    }
    FileCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.fileservice.getFileCategory().then(function (response) {
            _this.spinner.hide();
            var data = response;
            if (data.data) {
                _this.categories = data.data;
                console.log(_this.categories);
            }
        }, function (err) {
        });
    };
    FileCategoryComponent.prototype.addFile = function () {
        var _this = this;
        this.spinner.show();
        var params = {
            name: this.category_name,
            description: this.category_description,
            created_by: 1,
            updated_by: 1
        };
        this.fileservice.addFileCategory(params).then(function (response) {
            var data = response;
            if (data.data) {
                _this.category_name = '';
                _this.category_description = '';
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
    FileCategoryComponent.prototype.deleteFile = function (id) {
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
                _this.fileservice.deleteFileCategory(id).then(function (response) {
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
    FileCategoryComponent.prototype.updateFile = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(function (result) {
            if (result.value) {
                var params = {
                    name: _this.category_name,
                    description: _this.category_description
                };
                _this.fileservice.updateFileCategory(_this.id, params).then(function (response) {
                    var data = response;
                    if (data.data) {
                        _this.id = '';
                        _this.category_name = '';
                        _this.category_description = '';
                        _this.activeUpdate = false;
                        swal({
                            type: 'success',
                            title: 'Updated!',
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
    FileCategoryComponent.prototype.toUpdate = function (category) {
        this.id = category.id;
        this.category_name = category.name;
        this.category_description = category.description;
        this.activeUpdate = true;
    };
    FileCategoryComponent.prototype.clear = function () {
        this.category_name = '';
        this.category_description = '';
    };
    FileCategoryComponent.prototype.cancel = function () {
        this.id = '';
        this.category_name = '';
        this.category_description = '';
        this.activeUpdate = false;
    };
    FileCategoryComponent = __decorate([
        Component({
            selector: 'app-file-category',
            templateUrl: './file-category.component.html',
            styleUrls: ['./file-category.component.css']
        }),
        __metadata("design:paramtypes", [FileService, NgxSpinnerService, Router])
    ], FileCategoryComponent);
    return FileCategoryComponent;
}());
export { FileCategoryComponent };
//# sourceMappingURL=file-category.component.js.map