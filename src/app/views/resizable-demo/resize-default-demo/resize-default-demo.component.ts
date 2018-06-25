import { Component, OnInit } from '@angular/core';

declare const require: any;

@Component({
  selector: 'app-resize-default-demo',
  templateUrl: './resize-default-demo.component.html',
  styleUrls: ['./resize-default-demo.component.scss']
})
export class ResizeDefaultDemoComponent implements OnInit {
  demo_html = require('!!html-loader!./resize-default-demo.component.html');
  demo_ts = require('!!raw-loader!./resize-default-demo.component.ts');

  constructor() { }

  ngOnInit() {
  }

}
