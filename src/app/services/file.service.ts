import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  api: any = '';
  constructor(public http: HttpClient, public storage: LocalStorageService, public globalservice: GlobalService) {
    this.api = globalservice.getAPI();
  }

  getFileCategory() {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return new Promise(resolve => {
      this.http.get(this.api + "/api/me/file_category/", httpOptions)
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

  addFileCategory(params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.post(api + "/api/admin/file_category", params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  deleteFileCategory(id) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.delete(api + "/api/admin/file_category/" + id, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  deleteFile(id) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.delete(api + "/api/admin/file/" + id, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }


  updateFileCategory(id, params) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.put(api + "/api/admin/file_category/" + id, params, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  getFilesByCategory(id = 0) {
    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return new Promise(resolve => {
      this.http.get(this.api + "/api/me/file/" + id + "/category", httpOptions)
        .subscribe(response => {
          let data: any = response;
          if (data) {
            resolve(data.data);
          } else {
            resolve(response);
          }
        }, err => {
          resolve(err);
        });
    });
  }

  uploadFile(file) {
    var formData = new FormData();
    formData.append('file', file.file);
    formData.append('name', file.name);
    formData.append('file_category_id', file.file_category_id);

    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'mimeType': 'multipart/form-data',
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.post(api + "/api/me/file-upload", formData, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }
  editFile(id, params) {
    var formData = new FormData();
    if (params.file) {
      formData.append('file', params.file);
    }
    if (params.name) {
      formData.append('name', params.name);
    }
    if (params.file_category_id) {
      formData.append('file_category_id', params.file_category_id);
    }

    let token = this.storage.retrieve('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'mimeType': 'multipart/form-data',
      })
    };

    return new Promise(resolve => {
      let api = this.globalservice.getAPI();
      this.http.post(api + "/api/admin/edit-file-upload/" + id, formData, httpOptions)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

}

