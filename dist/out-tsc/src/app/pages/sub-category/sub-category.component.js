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
import { CategoryService } from '../../services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
var SubCategoryComponent = /** @class */ (function () {
    function SubCategoryComponent(subcategoryservice, spinner) {
        this.subcategoryservice = subcategoryservice;
        this.spinner = spinner;
        this.sub_category = {};
        this.sub_categories = [];
        this.categories = [];
        this.update = false;
    }
    SubCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subcategoryservice.getSubCategory().then(function (response) {
            var data = response;
            if (data.data) {
                _this.sub_categories = data.data;
                _this.subcategoryservice.getFileCategory().then(function (response) {
                    var data = response;
                    if (data.data) {
                        _this.categories = data.data;
                        console.log(_this.categories, "Items");
                    }
                });
                console.log(_this.sub_categories, "Items");
            }
        });
    };
    SubCategoryComponent.prototype.addItem = function () {
        var _this = this;
        this.spinner.show();
        this.subcategoryservice.addSubCategory(this.sub_category).then(function (response) {
            var data = response;
            if (data.data) {
                _this.sub_categories = {};
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
    SubCategoryComponent.prototype.deleteItem = function (id) {
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
                _this.subcategoryservice.deleteSubCategory(id).then(function (response) {
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
    SubCategoryComponent.prototype.updateItem = function () {
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
                _this.subcategoryservice.updateSubCategory(_this.sub_category.id, _this.sub_category).then(function (response) {
                    var data = response;
                    if (data.data) {
                        _this.sub_category = {};
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
    SubCategoryComponent.prototype.toUpdate = function (item) {
        this.sub_category = item;
        this.update = true;
    };
    SubCategoryComponent.prototype.clear = function () {
        this.sub_category = {};
    };
    SubCategoryComponent.prototype.cancel = function () {
        this.sub_category = {};
        this.update = false;
    };
    SubCategoryComponent = __decorate([
        Component({
            selector: 'app-sub-category',
            templateUrl: './sub-category.component.html',
            styleUrls: ['./sub-category.component.css']
        }),
        __metadata("design:paramtypes", [CategoryService, NgxSpinnerService])
    ], SubCategoryComponent);
    return SubCategoryComponent;
}());
export { SubCategoryComponent };
//# sourceMappingURL=sub-category.component.js.map