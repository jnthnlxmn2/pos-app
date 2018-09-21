import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  file_category: any = [];
  name: any = '';


  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  selectedCategory: any = '';
  file: any = {};
  editBolean = false;

  constructor(public routeparams: ActivatedRoute, public fileservice: FileService, private spinner: NgxSpinnerService, public router: Router) {

    this.uploader.onAfterAddingFile = function (data) {
      //    this.uploadAll();
      console.log(data.file.rawFile, "UP");
    };

  }

  ngOnInit() {
    if (this.routeparams.snapshot.params) {
      this.file = this.routeparams.snapshot.params;
      if (this.file.id) {
        this.editBolean = true;
        this.selectedCategory = this.file.file_category_id;
        this.name = this.file.name;
      }

    }
    this.spinner.show();
    this.fileservice.getFileCategory().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.file_category = data.data;
        console.log(this.file_category);
      }
    }, err => {

    })
  }

  editFile() {
    this.spinner.show();
    let params: any = {};
    if (this.uploader.queue[0]) {
      params = {
        'file': this.uploader.queue[0].file.rawFile,
        'file_category_id': this.selectedCategory,
        'name': this.name
      }
    } else {
      params = {
        'file_category_id': this.selectedCategory,
        'name': this.name
      }
    }
    this.fileservice.editFile(this.file.id, params).then(response => {
      let data: any = response;
      if (data.data) {
        this.spinner.hide();
        swal({
          type: 'success',
          title: 'Success!',
          text: 'close',
        });
        this.router.navigate(['/files', { id: this.selectedCategory }]);
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

  addFile() {
    this.spinner.show();
    if (this.uploader.queue[0]) {
      let params = {
        'file': this.uploader.queue[0].file.rawFile,
        'file_category_id': this.selectedCategory,
        'name': this.name
      }

      this.fileservice.uploadFile(params).then(response => {
        let data: any = response;
        console.log(data)
        if (data.data) {

          swal({
            type: 'success',
            title: 'Success!',
            text: 'close',
          });

          this.spinner.hide();
          this.router.navigate(['/files', { id: this.selectedCategory }]);
        } else {

          this.spinner.hide();
          swal({
            type: 'warning',
            title: 'Error!',
            text: 'close',
          });

          this.name = '';
          this.selectedCategory = ''
          this.uploader.clearQueue();
        }
      })

    } else {
      this.spinner.hide();

      swal({
        type: 'warning',
        title: 'File is Required',
        text: 'close',
      });

    }

  }

}
