import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ManufacturerService } from '../../services/manufacturer.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  categories: any = [];
  sub_categories: any = [];
  selected_category: any = '';
  selected_sub_category: any = '';
  manufucturers: any = [];
  items: any = [];
  items_holder: any = []
  objectItem: any = {};
  update: any = false;
  constructor(public categoryservice: CategoryService, public manufacturerservice: ManufacturerService,
    private spinner: NgxSpinnerService, public router: Router, public itemservice: ItemService) { }

  ngOnInit() {
    this.spinner.show();
    this.itemservice.getItems().then(response => {
      let data: any = response;
      if (data.data) {
        this.items = data.data.data;
        this.items_holder = data.data.data;
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

  selectSubCategory(id) {
    console.log(id);


    if (id) {
      this.items = [];
      this.items_holder.forEach(data => {
        if (data.category_id == id) {
          this.items.push(data);
        }
      });

      this.categoryservice.getSubCategoryByCategoryId(id).then(response => {
        this.spinner.hide();
        let data: any = response;
        if (data.data) {
          this.sub_categories = data.data;
          console.log(this.sub_categories);
        }
      }, err => {

      })
    } else {
      this.items = this.items_holder;
      console.log('test')
    }


  }

  loadSubCategory(id) {
    console.log(id)
    if (id) {
      this.items = [];
      this.items_holder.forEach(data => {
        if (data.sub_category_id == id) {
          this.items.push(data);
        }
      });
    } else {
      this.items = this.items_holder;
      console.log('test')
    }
  }


  addItem() {
    let message_ref = new Date();
    this.spinner.show();
    let item_code = 'ITM' + message_ref.getTime();
    this.objectItem.item_code = item_code;
    this.itemservice.addItem(this.objectItem).then(response => {
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

  deleteItem(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.itemservice.deleteItem(id).then(response => {
          let data: any = response;
          if (data) {

            swal({
              type: 'success',
              title: 'Deleted!',
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
    })
  }



  updateFile() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        this.itemservice.updateItem(this.objectItem.id, this.objectItem).then(response => {
          let data: any = response;
          if (data.data) {
            this.objectItem = {};

            swal({
              type: 'success',
              title: 'Updated!',
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
    })
  }


  toUpdate(item) {

    this.objectItem.category_id = item.category_id;
    this.objectItem.sub_category_id = item.sub_category_id;
    this.objectItem.name = item.name;
    this.objectItem.description = item.description;
    this.objectItem.item_code = item.item_code;
    this.objectItem.id = item.id;
    this.objectItem.manufacturer_id = item.manufacturer_id;
    this.objectItem.price = item.price;
    this.objectItem.total_stock = item.total_stock;
    this.selectSubCategory(item.category_id);
    this.update = true;
  }

  clear() {
    this.objectItem = {};
  }
  cancel() {
    this.objectItem = {};
    this.update = false;
  }

}
