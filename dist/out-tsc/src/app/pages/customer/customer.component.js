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
import { CustomerService } from '../../services/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(customerService, spinner, router) {
        this.customerService = customerService;
        this.spinner = spinner;
        this.router = router;
        this.customers = [];
        this.fullname = "";
        this.address = "";
        this.phone = "";
        this.id = "";
        this.update = false;
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.customerService.getCustomers().then(function (response) {
            _this.spinner.hide();
            var data = response;
            if (data.data) {
                _this.customers = data.data;
                console.log(_this.customers);
            }
        }, function (err) {
        });
    };
    CustomerComponent.prototype.addCustomer = function () {
        var _this = this;
        this.spinner.show();
        var params = {
            name: this.fullname,
            address: this.address,
            phone: this.phone,
            created_by: 1,
            updated_by: 1
        };
        this.customerService.addCustomer(params).then(function (response) {
            var data = response;
            if (data.data) {
                _this.fullname = '';
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
    CustomerComponent.prototype.deleteFile = function (id) {
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
                _this.customerService.deleteCustomer(id).then(function (response) {
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
    CustomerComponent.prototype.updateFile = function () {
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
                    name: _this.fullname,
                    address: _this.address,
                    phone: _this.phone,
                    created_by: 1,
                    updated_by: 1
                };
                _this.customerService.updateCustomer(_this.id, params).then(function (response) {
                    var data = response;
                    if (data.data) {
                        _this.id = '';
                        _this.fullname = '';
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
    CustomerComponent.prototype.toUpdate = function (customer) {
        this.id = customer.id;
        this.fullname = customer.name;
        this.address = customer.address;
        this.phone = customer.phone;
        this.update = true;
    };
    CustomerComponent.prototype.clear = function () {
        this.fullname = '';
        this.address = '';
        this.phone = '';
    };
    CustomerComponent.prototype.cancel = function () {
        this.id = '';
        this.fullname = '';
        this.address = '';
        this.phone = '';
        this.update = false;
    };
    CustomerComponent = __decorate([
        Component({
            selector: 'app-customer',
            templateUrl: './customer.component.html',
            styleUrls: ['./customer.component.css']
        }),
        __metadata("design:paramtypes", [CustomerService, NgxSpinnerService, Router])
    ], CustomerComponent);
    return CustomerComponent;
}());
export { CustomerComponent };
//# sourceMappingURL=customer.component.js.map