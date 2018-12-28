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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
var RefillComponent = /** @class */ (function () {
    function RefillComponent(categoryservice, manufacturerservice, spinner, router, itemservice, modalService) {
        this.categoryservice = categoryservice;
        this.manufacturerservice = manufacturerservice;
        this.spinner = spinner;
        this.router = router;
        this.itemservice = itemservice;
        this.modalService = modalService;
        this.items = [];
        this.categories = [];
        this.quantity = 0;
        this.manufucturers = [];
        this.item = {};
    }
    RefillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.itemservice.getItems().then(function (response) {
            var data = response;
            if (data.data) {
                _this.items = data.data.data;
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
    RefillComponent.prototype.proceed = function () {
        var _this = this;
        var params = this.quantity;
        this.itemservice.refill(this.item.id, params).then(function (response) {
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
    RefillComponent.prototype.open = function (content, item) {
        this.item = item;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then(function (result) {
        }, function (reason) {
        });
        this.quantity = 0;
    };
    RefillComponent = __decorate([
        Component({
            selector: 'app-refill',
            templateUrl: './refill.component.html',
            styleUrls: ['./refill.component.css']
        }),
        __metadata("design:paramtypes", [CategoryService, ManufacturerService,
            NgxSpinnerService, Router, ItemService, NgbModal])
    ], RefillComponent);
    return RefillComponent;
}());
export { RefillComponent };
//# sourceMappingURL=refill.component.js.map