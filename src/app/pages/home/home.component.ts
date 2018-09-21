import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  file_category: any = [];
  constructor(public fileservice: FileService, private spinner: NgxSpinnerService,public router:Router) { }

  ngOnInit() {
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
  loadFiles(file_category=null){
    if(file_category){
      let data = {
        id:file_category.id,
        name:file_category.name
      }
      this.router.navigate(['/files',data]);
    }else{
      this.router.navigate(['/files']);
    }
 
  }

}
