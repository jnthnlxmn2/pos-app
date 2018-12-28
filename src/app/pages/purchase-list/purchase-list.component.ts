import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { PurchaseService } from '../../services/purchase.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Moment from 'moment'
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

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

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  range: any = [null, null];
  constructor(private spinner: NgxSpinnerService, public router: Router, private modalService: NgbModal, public purchaseservice: PurchaseService, calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit() {
    this.spinner.show();
    this.purchaseservice.getPurchase().then(response => {
      let data: any = response;
      if (data.data) {
        this.spinner.hide();
        this.purchases = data.data.data;
        console.log(this.purchases, "Items")
        this.onDateSelection();
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


  onDateSelection() {
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
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }


}
