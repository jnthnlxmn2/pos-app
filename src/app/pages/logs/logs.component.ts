import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as Moment from 'moment';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(public itemservice: ItemService, private spinner: NgxSpinnerService, public router: Router) { }
  logs: any = [];
  ngOnInit() {
    this.spinner.show();
    this.itemservice.getLogs().then(response => {
      this.spinner.hide();
      let data: any = response;
      if (data.data) {
        this.logs = data.data.data;
        console.log(this.logs);
      }
    }, err => {
    })
  }


  showDate(date) {
    return Moment(date).format('LLL');
  }

}
