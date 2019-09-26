import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ngOnInit() {
    $('body').removeClass('login-page').addClass('skin-blue layout-top-nav');
  }
}
