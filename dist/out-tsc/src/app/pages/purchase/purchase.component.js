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
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { PurchaseService } from '../../services/purchase.service';
import { CategoryService } from '../../services/category.service';
var PurchaseComponent = /** @class */ (function () {
    function PurchaseComponent(itemservice, spinner, modalService, purchaseservice, categoryservice) {
        this.itemservice = itemservice;
        this.spinner = spinner;
        this.modalService = modalService;
        this.purchaseservice = purchaseservice;
        this.categoryservice = categoryservice;
        this.items = [];
        this.item = {};
        this.purchase_box = [];
        this.grand_total = 0;
        this.grand_quantity = 0;
        this.items_holder = [];
        this.print = {};
        this.amount_paid = 0;
        this.discount_code = null;
        this.categories = [];
    }
    PurchaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.categoryservice.getFileCategory().then(function (response) {
            var data = response;
            _this.categories = data.data;
            //   console.log(this.categories, "Categories")
            _this.itemservice.getItems().then(function (response) {
                var data = response;
                _this.spinner.hide();
                if (data.data) {
                    _this.items = data.data.data;
                    _this.items_holder = data.data.data;
                    //  console.log(this.items, "Items")
                }
            });
        });
    };
    PurchaseComponent.prototype.selectSubCategory = function (id) {
        var _this = this;
        //console.log(id);
        if (id) {
            this.items = [];
            this.items_holder.forEach(function (data) {
                if (data.category_id == id) {
                    _this.items.push(data);
                }
            });
        }
        else {
            this.items = this.items_holder;
            console.log('test');
        }
    };
    PurchaseComponent.prototype.open = function (content, item) {
        var _this = this;
        this.item = item;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    PurchaseComponent.prototype.okay = function (item) {
        var bolean = true;
        for (var x = 0; x < this.purchase_box.length; x++) {
            if (this.purchase_box[x].id == item.id) {
                bolean = false;
            }
        }
        if (bolean) {
            var object = {};
            object = item;
            object.quantity = item.quantity;
            object.total = object.quantity * object.price;
            this.purchase_box.push(object);
            this.compute();
        }
    };
    PurchaseComponent.prototype.remove = function (id) {
        for (var x = 0; x < this.purchase_box.length; x++) {
            if (this.purchase_box[x].id == id) {
                this.purchase_box.splice(x, 1);
            }
        }
        this.compute();
    };
    PurchaseComponent.prototype.change = function (quantity) {
        if (quantity > this.item.total_stock) {
            this.item.quantity = this.item.total_stock;
        }
    };
    PurchaseComponent.prototype.changeQuantity = function (item, quantity) {
        if (quantity > item.total_stock) {
            for (var x = 0; x < this.purchase_box.length; x++) {
                if (this.purchase_box[x].id == item.id) {
                    this.purchase_box[x].quantity = item.total_stock;
                    this.purchase_box[x].total = this.purchase_box[x].quantity * this.purchase_box[x].price;
                    this.compute();
                }
            }
            this.compute();
        }
        else {
            for (var x = 0; x < this.purchase_box.length; x++) {
                if (this.purchase_box[x].id == item.id) {
                    this.purchase_box[x].quantity = quantity;
                    this.purchase_box[x].total = this.purchase_box[x].quantity * this.purchase_box[x].price;
                    this.compute();
                }
            }
        }
        // console.log(this.purchase_box)
    };
    PurchaseComponent.prototype.compute = function () {
        var total = 0;
        var quantity = 0;
        this.purchase_box.forEach(function (box) {
            total = total + box.total;
            quantity = quantity + box.quantity;
        });
        this.grand_total = total;
        this.grand_quantity = quantity;
    };
    PurchaseComponent.prototype.proceed = function (receipt) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proceed'
        }).then(function (result) {
            if (result.value) {
                var items_1 = [];
                _this.purchase_box.forEach(function (box) {
                    var object = {};
                    object.product_id = box.id;
                    object.total_amount = box.total;
                    object.total_tax = 0;
                    object.tax = 0;
                    object.total_quantity = box.quantity;
                    object.customer_id = 1;
                    object.per_unit_id = 1;
                    object.amount = box.price;
                    items_1.push(object);
                });
                _this.grand_total = 0;
                _this.grand_quantity = 0;
                _this.purchaseservice.purchase(items_1, _this.discount_code, _this.amount_paid).then(function (response) {
                    var data = response;
                    if (data.data) {
                        if (data.data.error) {
                            swal({
                                type: 'warning',
                                title: data.data.error,
                                text: 'close',
                            });
                            _this.compute();
                        }
                        else {
                            //     console.log(data.data.tracking_number)
                            _this.print = data.data;
                            _this.purchase_box = [];
                            _this.amount_paid = 0;
                            _this.discount_code = null;
                            _this.ngOnInit();
                            _this.spinner.hide();
                            //     console.log('receipt', this.print)
                            _this.modalService.open(receipt, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(function (result) {
                                _this.closeResult = "Closed with: " + result;
                            }, function (reason) {
                                _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
                            });
                        }
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
    PurchaseComponent.prototype.getDismissReason = function (reason) {
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
    PurchaseComponent = __decorate([
        Component({
            selector: 'app-purchase',
            templateUrl: './purchase.component.html',
            styleUrls: ['./purchase.component.css']
        }),
        __metadata("design:paramtypes", [ItemService,
            NgxSpinnerService,
            NgbModal,
            PurchaseService,
            CategoryService])
    ], PurchaseComponent);
    return PurchaseComponent;
}());
export { PurchaseComponent };
//# sourceMappingURL=purchase.component.js.map