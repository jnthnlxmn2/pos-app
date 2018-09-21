import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><router-outlet></router-outlet><ngx-spinner></ngx-spinner>'
})
export class AppComponent {
  title = 'file-app';
}
