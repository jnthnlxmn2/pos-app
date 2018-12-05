import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import * as Moment from 'moment';
import { LocalStorageService } from 'ngx-webstorage';
import { GlobalService } from '../../services/global.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  category: any;
  files: any = []
  access_token = '';
  p: number = 1;
  api: any = '';
  me: any = {};
  isMobile = false;
  collection: any[] = this.files;
  constructor(public routeparams: ActivatedRoute, public fileservice: FileService,
    public storage: LocalStorageService, public globalservice: GlobalService,
    private spinner: NgxSpinnerService, public userservice: UserService, public router: Router) { }

  ngOnInit() {
    if (typeof window.orientation !== 'undefined') {
      this.isMobile = true;
    }
    this.userservice.getMe().then(response => {
      let data: any = response;
      if (data.data) {
        this.me = data.data
      }
      console.log(data.data, "ME")
    })
    this.api = this.globalservice.getAPI();
    this.access_token = this.storage.retrieve('token');
    if (this.routeparams.snapshot.params) {
      let category: any = this.routeparams.snapshot.params;
      this.fileservice.getFilesByCategory(category.id).then(response => {
        console.log(response);
        let data: any = response;
        this.files = data.data;
      })
    } else {
      this.fileservice.getFilesByCategory(0).then(response => {
        let data: any = response;
        this.files = data.data;
        console.log(response);
      })
    }
  }
  showDate(date) {
    return Moment(date).format('ll');
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
        this.spinner.show();
        this.fileservice.deleteFile(id).then(response => {
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
  edit(file) {
    this.router.navigate(["/add-file", file])
  }

}
