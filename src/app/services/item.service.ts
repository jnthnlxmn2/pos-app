import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  api: any = '';
  constructor(public http: HttpClient, public storage: LocalStorageService, public globalservice: GlobalService) {
    this.api = globalservice.getAPI();
  }

  addItem(params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.post(api + "/api/admin/items", params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  deleteItem(id) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.delete(api + "/api/admin/items/" + id, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }


  updateItem(id, params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.put(api + "/api/admin/items/" + id, params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  getItems() {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.get(api + "/api/admin/items", httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  getLogs() {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.get(api + "/api/admin/logs", httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  refill(id, params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.put(api + "/api/admin/refill/" + id + '/?stock=' + params, params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

}

