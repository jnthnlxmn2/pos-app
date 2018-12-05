import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  api: any = '';
  constructor(public http: HttpClient, public storage: LocalStorageService, public globalservice: GlobalService) {
    this.api = globalservice.getAPI();
  }

  addUnitType(params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.post(api + "/api/admin/unittype", params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  getUnitTypes() {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return new Promise(resolve => {
      this.http.get(this.api + "/api/admin/unittype/", httpOptions)
        .subscribe(response => {
          let data: any = response;
          if (data.data) {
            resolve(data.data);
          } else {
            resolve(response);
          }
        }, err => {
          resolve(err);
        });
    });
  }
  deleteUnitType(id) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.delete(api + "/api/admin/unittype/" + id, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }
  updateUnitType(id, params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.put(api + "/api/admin/unittype/" + id, params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }
}
