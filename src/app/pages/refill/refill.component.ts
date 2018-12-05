import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ManufacturerService } from '../../services/manufacturer.service';
import { ItemService } from '../../services/item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.css']
})
export class RefillComponent implements OnInit {
  items: any = [];
  categories: any = [];
  quantity: any = 0;
  manufucturers: any = [];
  item: any = {};
  constructor(public categoryservice: CategoryService, public manufacturerservice: ManufacturerService,
    private spinner: NgxSpinnerService, public router: Router, public itemservice: ItemService, private modalService: NgbModal) { }

  ngOnInit() {

    this.spinner.show();
    this.itemservice.getItems().then(response => {
      let data: any = response;
      if (data.data) {
        this.items = data.data.data;
        console.log(this.items, "Items")
      }
      this.categoryservice.getFileCategory().then(response => {
        this.spinner.hide();
        let data: any = response;
        if (data.data) {
          this.categories = data.data;
          this.manufacturerservice.getManufacturer().then(response => {
            let data: any = response;
            if (data.data) {
              this.manufucturers = data.data;
            }
          }, err => {

          })
        }
      }, err => {

      })
    })
  }

  proceed() {
    let params = this.quantity
    this.itemservice.refill(this.item.id, params).then(response => {
      let data: any = response;
      if (data.data) {
        this.items = [];
        swal({
          type: 'success',
          title: 'Success!',
          text: 'close',
        });
        this.ngOnInit();
        this.spinner.hide();
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

  open(content, item) {
    this.item = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }, ).result.then((result) => {
    }, (reason) => {
    });
    this.quantity = 0;
  }

}
