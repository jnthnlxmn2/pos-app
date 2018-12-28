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
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Moment from 'moment';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
var PurchaseListComponent = /** @class */ (function () {
    function PurchaseListComponent(spinner, router, modalService, purchaseservice, calendar) {
        this.spinner = spinner;
        this.router = router;
        this.modalService = modalService;
        this.purchaseservice = purchaseservice;
        this.purchases = [];
        this.purchase_box = {};
        this.purchase = {};
        this.range = [null, null];
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getToday();
    }
    PurchaseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.purchaseservice.getPurchase().then(function (response) {
            var data = response;
            if (data.data) {
                _this.spinner.hide();
                _this.purchases = data.data.data;
                console.log(_this.purchases, "Items");
                _this.onDateSelection();
            }
        });
    };
    PurchaseListComponent.prototype.viewDetails = function (content, item) {
        var _this = this;
        this.purchase_box = item.purchase_details;
        this.purchase = item;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        console.log(item, "ITEMS");
    };
    PurchaseListComponent.prototype.showDate = function (date) {
        return Moment(date).format('LLL');
    };
    PurchaseListComponent.prototype.getDismissReason = function (reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    PurchaseListComponent.prototype.onDateSelection = function () {
        console.log(this.fromDate, "FROMMMM");
        console.log(this.toDate, "TOOOO");
        if (this.fromDate != null && this.toDate != null) {
            this.range = [new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day), new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day)];
        }
        else if (this.fromDate == null && this.toDate == null) {
            this.range = [new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day), null];
        }
        else {
            this.range = [new Date(), null];
        }
        /* if (!this.fromDate && !this.toDate) {
           this.fromDate = date;
           this.range = [null, null];
         } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
           this.toDate = date;
           this.range = [new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day), new Date(this.toDate.year, this.toDate.month-1, this.toDate.day)];
         } else {
           this.toDate = null;
           this.fromDate = date;
     
           this.range = [new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day), null];
         }*/
    };
    PurchaseListComponent.prototype.isHovered = function (date) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    };
    PurchaseListComponent.prototype.isInside = function (date) {
        return date.after(this.fromDate) && date.before(this.toDate);
    };
    PurchaseListComponent.prototype.isRange = function (date) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    };
    PurchaseListComponent = __decorate([
        Component({
            selector: 'app-purchase-list',
            templateUrl: './purchase-list.component.html',
            styleUrls: ['./purchase-list.component.css']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, Router, NgbModal, PurchaseService, NgbCalendar])
    ], PurchaseListComponent);
    return PurchaseListComponent;
}());
export { PurchaseListComponent };
//# sourceMappingURL=purchase-list.component.js.map