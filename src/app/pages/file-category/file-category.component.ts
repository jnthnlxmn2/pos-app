import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-file-category',
  templateUrl: './file-category.component.html',
  styleUrls: ['./file-category.component.css']
})
export class FileCategoryComponent implements OnInit {
  categories: any = [];
  category_name = '';
  category_description = '';
  activeUpdate = false;
  id = '';
  constructor(public fileservice: FileService, private spinner: NgxSpinnerService, public router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.fileservice.getFileCategory().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.categories = data.data;
        console.log(this.categories);
      }
    }, err => {

    })
  }


  addFile() {
    this.spinner.show();
    let params = {
      name: this.category_name,
      description: this.category_description,
      created_by:1,
      updated_by:1
    }
    this.fileservice.addFileCategory(params).then(response => {
      let data: any = response;
      if (data.data) {
        this.category_name = '';
        this.category_description = '';
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

  deleteFile(id) {
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

        this.fileservice.deleteFileCategory(id).then(response => {
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
        let params = {
          name: this.category_name,
          description: this.category_description
        }
        this.fileservice.updateFileCategory(this.id, params).then(response => {
          let data: any = response;
          if (data.data) {
            this.id = '';
            this.category_name = '';
            this.category_description = '';
            this.activeUpdate = false;

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

  toUpdate(category) {
    this.id = category.id;
    this.category_name = category.name;
    this.category_description = category.description;
    this.activeUpdate = true;
  }

  clear() {
    this.category_name = '';
    this.category_description = '';
  }
  cancel() {
    this.id = '';
    this.category_name = '';
    this.category_description = '';
    this.activeUpdate = false;
  }

}
