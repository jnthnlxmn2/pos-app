import { Component, OnInit } from '@angular/core';
import { UnitTypeService } from '../../services/unit-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.css']
})
export class UnitTypeComponent implements OnInit {
  unit_types:any=[];
  name:any='';
  description:any='';
  id:any='';
  quantity:any='';
  update:any=false;
  constructor(public unitTypeService: UnitTypeService, private spinner: NgxSpinnerService, public router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.unitTypeService.getUnitTypes().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.unit_types = data.data;
        console.log(this.unit_types);
      }
    }, err => {
    })
  }


  add() {
    this.spinner.show();
    let params = {
      name: this.name,
      description: this.description,
      quantity:this.quantity,
      created_by:1,
      updated_by:1
    }
    this.unitTypeService.addUnitType(params).then(response => {
      let data: any = response;
      if (data.data) {
        this.name = '';
        this.description = '';
        this.quantity = '';
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

  delete(id) {
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

        this.unitTypeService.deleteUnitType(id).then(response => {
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

  updateUnit() {
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
          name: this.name,
          description: this.description,
          quantity:this.quantity,
        }
        this.unitTypeService.updateUnitType(this.id, params).then(response => {
          let data: any = response;
          if (data.data) {
            this.id = '';
            this.name = '';
            this.description = '';
            this.quantity='';
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

  toUpdate(unit) {
    this.id = unit.id;
    this.name = unit.name;
    this.description = unit.description;
    this.quantity = unit.quantity;
    this.update = true;
  }

  clear() {
    this.name = '';
    this.description = '';
    this.quantity = '';
  }
  cancel() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.quantity = '';
    this.update = false;
  }

}
