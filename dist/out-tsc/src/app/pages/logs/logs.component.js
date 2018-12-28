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
import { ItemService } from '../../services/item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as Moment from 'moment';
var LogsComponent = /** @class */ (function () {
    function LogsComponent(itemservice, spinner, router) {
        this.itemservice = itemservice;
        this.spinner = spinner;
        this.router = router;
        this.logs = [];
    }
    LogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.itemservice.getLogs().then(function (response) {
            _this.spinner.hide();
            var data = response;
            if (data.data) {
                _this.logs = data.data.data;
                console.log(_this.logs);
            }
        }, function (err) {
        });
    };
    LogsComponent.prototype.showDate = function (date) {
        return Moment(date).format('LLL');
    };
    LogsComponent = __decorate([
        Component({
            selector: 'app-logs',
            templateUrl: './logs.component.html',
            styleUrls: ['./logs.component.css']
        }),
        __metadata("design:paramtypes", [ItemService, NgxSpinnerService, Router])
    ], LogsComponent);
    return LogsComponent;
}());
export { LogsComponent };
//# sourceMappingURL=logs.component.js.map