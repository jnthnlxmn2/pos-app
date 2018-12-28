import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { PurchaseService } from '../../services/purchase.service';
import { CategoryService } from '../../services/category.service';
import { NGB_DATEPICKER_DATE_ADAPTER_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  items: any = [];
  item: any = {};
  closeResult: string;
  purchase_box: any = [];
  grand_total: any = 0;
  grand_quantity: any = 0;
  items_holder: any = [];
  print: any = {};
  amount_paid: any = 0;
  discount_code: any = null;
  categories: any = [];
  constructor(public itemservice: ItemService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public purchaseservice: PurchaseService,
    public categoryservice: CategoryService) { }

  ngOnInit() {
    this.spinner.show();
    this.categoryservice.getFileCategory().then(response => {
      let data: any = response;
      this.categories = data.data;
      //   console.log(this.categories, "Categories")
      this.itemservice.getItems().then(response => {
        let data: any = response;
        this.spinner.hide();
        if (data.data) {
          this.items = data.data.data;
          this.items_holder = data.data.data;
          //  console.log(this.items, "Items")
        }
      })
    })
  }


  selectSubCategory(id) {
    //console.log(id);
    if (id) {
      this.items = [];
      this.items_holder.forEach(data => {
        if (data.category_id == id) {
          this.items.push(data);
        }
      });
    } else {
      this.items = this.items_holder;

    }
  }

  open(content, item) {
    this.item = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }, ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  okay(item) {
    let bolean = true;
    for (let x = 0; x < this.purchase_box.length; x++) {
      if (this.purchase_box[x].id == item.id) {
        bolean = false;
      }
    }
    if (bolean) {
      let object: any = {};
      object = item;
      object.quantity = item.quantity;
      //1st object.total = object.quantity * object.price;
      object.total_sale = object.quantity * object.sale_price
      object.total = object.quantity * object.price;
      this.purchase_box.push(object);
      this.compute();
    }
  }

  remove(id) {
    for (let x = 0; x < this.purchase_box.length; x++) {
      if (this.purchase_box[x].id == id) {
        this.purchase_box.splice(x, 1);
      }
    }
    this.compute();
  }

  change(quantity) {
    if (quantity > this.item.total_item_stock_quantity) {
      this.item.quantity = this.item.total_item_stock_quantity;
    }
  }

  changeQuantity(item, quantity) {
    if (quantity > item.total_stock) {
      for (let x = 0; x < this.purchase_box.length; x++) {
        if (this.purchase_box[x].id == item.id) {
          this.purchase_box[x].quantity = item.total_stock;
          // 1st  this.purchase_box[x].total = this.purchase_box[x].quantity * this.purchase_box[x].price;
          this.purchase_box[x].total = this.purchase_box[x].quantity * this.purchase_box[x].price;
          this.purchase_box[x].total_sale = this.purchase_box[x].quantity * this.purchase_box[x].sale_price;
          this.compute();
        }
      }
      this.compute();
    } else {
      for (let x = 0; x < this.purchase_box.length; x++) {
        if (this.purchase_box[x].id == item.id) {
          this.purchase_box[x].quantity = quantity;
          //1st this.purchase_box[x].total = this.purchase_box[x].quantity * this.purchase_box[x].price;
          this.purchase_box[x].total = this.purchase_box[x].quantity * this.purchase_box[x].price;
          this.purchase_box[x].total_sale = this.purchase_box[x].quantity * this.purchase_box[x].sale_price;
          this.compute();
        }
      }
    }
    // console.log(this.purchase_box)
  }

  compute() {
    let total = 0;
    let quantity = 0;
    this.purchase_box.forEach(box => {
      total = total + box.total_sale;
      quantity = quantity + box.quantity;
    });
    this.grand_total = total;
    this.grand_quantity = quantity;
  }

  proceed(receipt) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.value) {
        let items: any = [];
        this.purchase_box.forEach(box => {
          let object: any = {};
          object.product_id = box.id;
          object.total_amount = box.total;
          object.total_tax = 0;
          object.tax = 0;
          object.total_quantity = box.quantity;
          object.customer_id = 1;
          object.per_unit_id = 1;
          object.amount = box.price;
          object.sale_amount = box.sale_price;
          object.total_sale = box.total_sale;
          items.push(object);
        });
        this.grand_total = 0;
        this.grand_quantity = 0;
        this.purchaseservice.purchase(items, this.discount_code, this.amount_paid).then(response => {
          let data: any = response;
          if (data.data) {
            if (data.data.error) {
              swal({
                type: 'warning',
                title: data.data.error,
                text: 'close',
              });
              this.compute()
            }
            else {
              //     console.log(data.data.tracking_number)
              this.print = data.data;
              this.purchase_box = [];
              this.amount_paid = 0;
              this.discount_code = null;
              this.ngOnInit();
              this.spinner.hide();
              //     console.log('receipt', this.print)
              this.modalService.open(receipt, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }, ).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
              }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
              });
            }

          } else {

            this.spinner.hide();
            swal({
              type: 'warning',
              title: 'Error!',
              text: 'close',
            });
          }
        })
      }
    })

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
