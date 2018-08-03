import { Component, OnInit } from '@angular/core';

declare const require: any;

@Component({
  selector: 'app-iframe-demo',
  templateUrl: './iframe-demo.component.html',
  styleUrls: ['./iframe-demo.component.scss']
})
export class IframeDemoComponent implements OnInit {
  demo_html = require('!!html-loader!./iframe-demo.component.html');
  demo_ts = require('!!raw-loader!./iframe-demo.component.ts');
  demo_scss = require('!!raw-loader!./iframe-demo.component.scss');

  constructor() { }

  ngOnInit() {
  }

}
