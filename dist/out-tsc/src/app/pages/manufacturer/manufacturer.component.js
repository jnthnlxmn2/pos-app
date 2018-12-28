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
import { ManufacturerService } from '../../services/manufacturer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
var ManufacturerComponent = /** @class */ (function () {
    function ManufacturerComponent(manufacturerService, spinner, router) {
        this.manufacturerService = manufacturerService;
        this.spinner = spinner;
        this.router = router;
        this.manufacturers = [];
        this.name = "";
        this.description = "";
        this.address = "";
        this.phone = "";
        this.id = "";
        this.update = false;
    }
    ManufacturerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.manufacturerService.getManufacturer().then(function (response) {
            _this.spinner.hide();
            var data = response;
            if (data.data) {
                _this.manufacturers = data.data;
                console.log(_this.manufacturers);
            }
        }, function (err) {
        });
    };
    ManufacturerComponent.prototype.addCustomer = function () {
        var _this = this;
        this.spinner.show();
        var params = {
            name: this.name,
            description: this.description,
            address: this.address,
            phone: this.phone,
            created_by: 1,
            updated_by: 1
        };
        this.manufacturerService.addManufacturer(params).then(function (response) {
            var data = response;
            if (data.data) {
                _this.name = '';
                _this.description = '';
                _this.address = '';
                _this.phone = '';
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
    ManufacturerComponent.prototype.deleteFile = function (id) {
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
                _this.manufacturerService.deleteManufacturer(id).then(function (response) {
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
    ManufacturerComponent.prototype.updateFile = function () {
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
                    name: _this.name,
                    description: _this.description,
                    address: _this.address,
                    phone: _this.phone,
                    created_by: 1,
                    updated_by: 1
                };
                _this.manufacturerService.updateManufacturer(_this.id, params).then(function (response) {
                    var data = response;
                    if (data.data) {
                        _this.id = '';
                        _this.name = '';
                        _this.description = '';
                        _this.address = '';
                        _this.phone = '';
                        _this.update = false;
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
    ManufacturerComponent.prototype.toUpdate = function (manufacturer) {
        this.id = manufacturer.id;
        this.name = manufacturer.name;
        this.description = manufacturer.description;
        this.address = manufacturer.address;
        this.phone = manufacturer.phone;
        this.update = true;
    };
    ManufacturerComponent.prototype.clear = function () {
        this.name = '';
        this.description = '';
        this.address = '';
        this.phone = '';
    };
    ManufacturerComponent.prototype.cancel = function () {
        this.id = '';
        this.name = '';
        this.description = '';
        this.address = '';
        this.phone = '';
        this.update = false;
    };
    ManufacturerComponent = __decorate([
        Component({
            selector: 'app-manufacturer',
            templateUrl: './manufacturer.component.html',
            styleUrls: ['./manufacturer.component.css']
        }),
        __metadata("design:paramtypes", [ManufacturerService, NgxSpinnerService, Router])
    ], ManufacturerComponent);
    return ManufacturerComponent;
}());
export { ManufacturerComponent };
//# sourceMappingURL=manufacturer.component.js.map