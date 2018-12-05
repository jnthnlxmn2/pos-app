import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  sub_category: any = {};
  sub_categories: any = [];
  categories: any = [];
  update: any = false;
  constructor(public subcategoryservice: CategoryService, public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.subcategoryservice.getSubCategory().then(response => {
      let data: any = response;
      if (data.data) {
        this.sub_categories = data.data;
        this.subcategoryservice.getFileCategory().then(response => {
          let data: any = response;
          if (data.data) {
            this.categories = data.data;
            console.log(this.categories, "Items")
          }
        })
        console.log(this.sub_categories, "Items")
      }
    })

  }




  addItem() {

    this.spinner.show();

    this.subcategoryservice.addSubCategory(this.sub_category).then(response => {
      let data: any = response;
      if (data.data) {
        this.sub_categories = {};
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

        this.subcategoryservice.deleteSubCategory(id).then(response => {
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



  updateItem() {
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
        this.subcategoryservice.updateSubCategory(this.sub_category.id, this.sub_category).then(response => {
          let data: any = response;
          if (data.data) {
            this.sub_category = {};

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
    this.sub_category = item;
    this.update = true;
  }

  clear() {
    this.sub_category = {};
  }
  cancel() {
    this.sub_category = {};
    this.update = false;
  }


}
