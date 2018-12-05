import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  items: any = [];
  closeResult: string;
  purchase_box: any = [];
  grand_total: any = 0;
  grand_quantity: any = 0;
  constructor(public itemservice: ItemService, private spinner: NgxSpinnerService, private modalService: NgbModal, public purchaseservice: PurchaseService) { }

  ngOnInit() {
    this.spinner.show();
    this.itemservice.getItems().then(response => {
      let data: any = response;
      this.spinner.hide();
      if (data.data) {
        this.items = data.data.data;
        console.log(this.items, "Items")
      }
    })
  }

  open(content, item) {
    let bolean = true;
    for (let x = 0; x < this.purchase_box.length; x++) {
      if (this.purchase_box[x].id == item.id) {
        bolean = false;
      }
    }
    if (bolean) {
      let object: any = {};
      object = item;
      object.quantity = 1;
      object.total = object.quantity * object.price;
      this.purchase_box.push(object);
      this.compute();
      console.log(this.purchase_box, "ITEM");
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }, ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  remove(id) {
    for (let x = 0; x < this.purchase_box.length; x++) {
      if (this.purchase_box[x].id == id) {
        this.purchase_box.splice(x, 1);
      }
    }
    this.compute();
  }

  changeQuantity(item, quantity) {
    if (quantity > item.total_stock) {
      for (let x = 0; x < this.purchase_box.length; x++) {
        if (this.purchase_box[x].id == item.id) {
          this.purchase_box[x].quantity = item.total_stock;
          this.purchase_box[x].total = this.purchase_box[x].quantity * this.purchase_box[x].price;
          this.compute();
        }
      }
      this.compute();
    } else {
      for (let x = 0; x < this.purchase_box.length; x++) {
        if (this.purchase_box[x].id == item.id) {
          this.purchase_box[x].quantity = quantity;
          this.purchase_box[x].total = this.purchase_box[x].quantity * this.purchase_box[x].price;
          this.compute();
        }
      }
    }
    console.log(this.purchase_box)
  }

  compute() {
    let total = 0;
    let quantity = 0;
    this.purchase_box.forEach(box => {
      total = total + box.total;
      quantity = quantity + box.quantity;
    });
    this.grand_total = total;
    this.grand_quantity = quantity;
  }

  proceed() {
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
          items.push(object);
        });

        this.purchaseservice.purchase(items).then(response => {
          let data: any = response;
          if (data.data) {
            if (data.data.error) {
              swal({
                type: 'warning',
                title: data.data.error,
                text: 'close',
              });
              this.purchase_box = [];
              this.ngOnInit();
              this.spinner.hide();
            }
            else {
              swal({
                type: 'success',
                title: 'Purchased!',
                text: 'close',
              });
              this.purchase_box = [];
              this.ngOnInit();
              this.spinner.hide();
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
