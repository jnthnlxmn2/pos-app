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
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ManufacturerService } from '../../services/manufacturer.service';
import { ItemService } from '../../services/item.service';
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(categoryservice, manufacturerservice, spinner, router, itemservice) {
        this.categoryservice = categoryservice;
        this.manufacturerservice = manufacturerservice;
        this.spinner = spinner;
        this.router = router;
        this.itemservice = itemservice;
        this.categories = [];
        this.sub_categories = [];
        this.selected_category = '';
        this.selected_sub_category = '';
        this.manufucturers = [];
        this.items = [];
        this.items_holder = [];
        this.objectItem = {};
        this.update = false;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.itemservice.getItems().then(function (response) {
            var data = response;
            if (data.data) {
                _this.items = data.data.data;
                _this.items_holder = data.data.data;
                console.log(_this.items, "Items");
            }
            _this.categoryservice.getFileCategory().then(function (response) {
                _this.spinner.hide();
                var data = response;
                if (data.data) {
                    _this.categories = data.data;
                    _this.manufacturerservice.getManufacturer().then(function (response) {
                        var data = response;
                        if (data.data) {
                            _this.manufucturers = data.data;
                        }
                    }, function (err) {
                    });
                }
            }, function (err) {
            });
        });
    };
    ItemsComponent.prototype.selectSubCategory = function (id) {
        var _this = this;
        console.log(id);
        if (id) {
            this.items = [];
            this.items_holder.forEach(function (data) {
                if (data.category_id == id) {
                    _this.items.push(data);
                }
            });
            this.categoryservice.getSubCategoryByCategoryId(id).then(function (response) {
                _this.spinner.hide();
                var data = response;
                if (data.data) {
                    _this.sub_categories = data.data;
                    console.log(_this.sub_categories);
                }
            }, function (err) {
            });
        }
        else {
            this.items = this.items_holder;
            console.log('test');
        }
    };
    ItemsComponent.prototype.loadSubCategory = function (id) {
        var _this = this;
        console.log(id);
        if (id) {
            this.items = [];
            this.items_holder.forEach(function (data) {
                if (data.sub_category_id == id) {
                    _this.items.push(data);
                }
            });
        }
        else {
            this.items = this.items_holder;
            console.log('test');
        }
    };
    ItemsComponent.prototype.addItem = function () {
        var _this = this;
        var message_ref = new Date();
        this.spinner.show();
        var item_code = 'ITM' + message_ref.getTime();
        this.objectItem.item_code = item_code;
        this.itemservice.addItem(this.objectItem).then(function (response) {
            var data = response;
            if (data.data) {
                _this.items = [];
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
    ItemsComponent.prototype.deleteItem = function (id) {
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
                _this.itemservice.deleteItem(id).then(function (response) {
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
    ItemsComponent.prototype.updateFile = function () {
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
                _this.itemservice.updateItem(_this.objectItem.id, _this.objectItem).then(function (response) {
                    var data = response;
                    if (data.data) {
                        _this.objectItem = {};
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
    ItemsComponent.prototype.toUpdate = function (item) {
        this.objectItem.category_id = item.category_id;
        this.objectItem.sub_category_id = item.sub_category_id;
        this.objectItem.name = item.name;
        this.objectItem.description = item.description;
        this.objectItem.item_code = item.item_code;
        this.objectItem.id = item.id;
        this.objectItem.manufacturer_id = item.manufacturer_id;
        this.objectItem.price = item.price;
        this.objectItem.total_stock = item.total_stock;
        this.selectSubCategory(item.category_id);
        this.update = true;
    };
    ItemsComponent.prototype.clear = function () {
        this.objectItem = {};
    };
    ItemsComponent.prototype.cancel = function () {
        this.objectItem = {};
        this.update = false;
    };
    ItemsComponent = __decorate([
        Component({
            selector: 'app-items',
            templateUrl: './items.component.html',
            styleUrls: ['./items.component.css']
        }),
        __metadata("design:paramtypes", [CategoryService, ManufacturerService,
            NgxSpinnerService, Router, ItemService])
    ], ItemsComponent);
    return ItemsComponent;
}());
export { ItemsComponent };
//# sourceMappingURL=items.component.js.map