import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: any = [];
  fullname: any = "";
  address: any = "";
  phone: any = "";
  id: any = "";
  update: any = false;

  constructor(public customerService: CustomerService, private spinner: NgxSpinnerService, public router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.customerService.getCustomers().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.customers = data.data;
        console.log(this.customers);
      }
    }, err => {

    })
  }

  addCustomer() {
    this.spinner.show();
    let params = {
      name: this.fullname,
      address: this.address,
      phone: this.phone,
      created_by: 1,
      updated_by: 1
    }
    this.customerService.addCustomer(params).then(response => {
      let data: any = response;
      if (data.data) {
        this.fullname = '';
        this.address = '';
        this.phone = '';
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

        this.customerService.deleteCustomer(id).then(response => {
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
          name: this.fullname,
          address: this.address,
          phone: this.phone,
          created_by: 1,
          updated_by: 1
        }
        this.customerService.updateCustomer(this.id, params).then(response => {
          let data: any = response;
          if (data.data) {
            this.id = '';
            this.fullname = '';
            this.address = '';
            this.phone = '';
            this.update = false;

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

  toUpdate(customer) {
    this.id = customer.id;
    this.fullname = customer.name;
    this.address = customer.address;
    this.phone = customer.phone;
    this.update = true;
  }

  clear() {
    this.fullname = '';
    this.address = '';
    this.phone = '';
  }
  cancel() {
    this.id = '';
    this.fullname = '';
    this.address = '';
    this.phone = '';
    this.update = false;
  }


}
