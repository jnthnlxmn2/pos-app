import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { PurchaseService } from '../../services/purchase.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Moment from 'moment'

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  purchases: any = []
  purchase_box = {};
  purchase = {};
  closeResult: string;
  constructor(private spinner: NgxSpinnerService, public router: Router, private modalService: NgbModal, public purchaseservice: PurchaseService) { }

  ngOnInit() {
    this.spinner.show();
    this.purchaseservice.getPurchase().then(response => {
      let data: any = response;
      if (data.data) {
        this.spinner.hide();
        this.purchases = data.data.data;
        console.log(this.purchases, "Items")
      }
    })
  }

  viewDetails(content, item) {
    this.purchase_box = item.purchase_details;
    this.purchase = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }, ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(item, "ITEMS");
  }

  showDate(date) {
    return Moment(date).format('LLL');
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
