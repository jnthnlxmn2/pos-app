import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  api = 'http://fusedtechserver:8080';
  constructor() { }
  
  getAPI() {
    return this.api;
  }
}

