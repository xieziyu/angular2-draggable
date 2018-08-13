import { Component, OnInit } from '@angular/core';

declare const require: any;

@Component({
  selector: 'app-resize-grid-demo',
  templateUrl: './resize-grid-demo.component.html',
  styleUrls: ['./resize-grid-demo.component.scss']
})
export class ResizeGridDemoComponent implements OnInit {
  demo_html = require('!!html-loader!./resize-grid-demo.component.html');
  demo_ts = require('!!raw-loader!./resize-grid-demo.component.ts');

  constructor() { }

  ngOnInit() {
  }

}
