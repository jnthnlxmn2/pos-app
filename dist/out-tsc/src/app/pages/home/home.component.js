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
var HomeComponent = /** @class */ (function () {
    function HomeComponent(fileservice, spinner, router) {
        this.fileservice = fileservice;
        this.spinner = spinner;
        this.router = router;
        this.file_category = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.fileservice.getFileCategory().then(function (response) {
            _this.spinner.hide();
            var data = response;
            if (data.data) {
                _this.file_category = data.data;
                console.log(_this.file_category);
            }
        }, function (err) {
        });
    };
    HomeComponent.prototype.loadFiles = function (file_category) {
        if (file_category === void 0) { file_category = null; }
        if (file_category) {
            var data = {
                id: file_category.id,
                name: file_category.name
            };
            this.router.navigate(['/files', data]);
        }
        else {
            this.router.navigate(['/files']);
        }
    };
    HomeComponent = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [FileService, NgxSpinnerService, Router])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map