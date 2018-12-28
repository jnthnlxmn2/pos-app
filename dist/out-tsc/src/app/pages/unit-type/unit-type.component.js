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
import { UnitTypeService } from '../../services/unit-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
var UnitTypeComponent = /** @class */ (function () {
    function UnitTypeComponent(unitTypeService, spinner, router) {
        this.unitTypeService = unitTypeService;
        this.spinner = spinner;
        this.router = router;
        this.unit_types = [];
        this.name = '';
        this.description = '';
        this.id = '';
        this.quantity = '';
        this.update = false;
    }
    UnitTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.unitTypeService.getUnitTypes().then(function (response) {
            _this.spinner.hide();
            var data = response;
            if (data.data) {
                _this.unit_types = data.data;
                console.log(_this.unit_types);
            }
        }, function (err) {
        });
    };
    UnitTypeComponent.prototype.add = function () {
        var _this = this;
        this.spinner.show();
        var params = {
            name: this.name,
            description: this.description,
            quantity: this.quantity,
            created_by: 1,
            updated_by: 1
        };
        this.unitTypeService.addUnitType(params).then(function (response) {
            var data = response;
            if (data.data) {
                _this.name = '';
                _this.description = '';
                _this.quantity = '';
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
    UnitTypeComponent.prototype.delete = function (id) {
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
                _this.unitTypeService.deleteUnitType(id).then(function (response) {
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
    UnitTypeComponent.prototype.updateUnit = function () {
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
                    quantity: _this.quantity,
                };
                _this.unitTypeService.updateUnitType(_this.id, params).then(function (response) {
                    var data = response;
                    if (data.data) {
                        _this.id = '';
                        _this.name = '';
                        _this.description = '';
                        _this.quantity = '';
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
    UnitTypeComponent.prototype.toUpdate = function (unit) {
        this.id = unit.id;
        this.name = unit.name;
        this.description = unit.description;
        this.quantity = unit.quantity;
        this.update = true;
    };
    UnitTypeComponent.prototype.clear = function () {
        this.name = '';
        this.description = '';
        this.quantity = '';
    };
    UnitTypeComponent.prototype.cancel = function () {
        this.id = '';
        this.name = '';
        this.description = '';
        this.quantity = '';
        this.update = false;
    };
    UnitTypeComponent = __decorate([
        Component({
            selector: 'app-unit-type',
            templateUrl: './unit-type.component.html',
            styleUrls: ['./unit-type.component.css']
        }),
        __metadata("design:paramtypes", [UnitTypeService, NgxSpinnerService, Router])
    ], UnitTypeComponent);
    return UnitTypeComponent;
}());
export { UnitTypeComponent };
//# sourceMappingURL=unit-type.component.js.map