import { Component, OnInit } from '@angular/core';

declare const require: any;

@Component({
  selector: 'app-resize-min-max-demo',
  templateUrl: './resize-min-max-demo.component.html',
  styleUrls: ['./resize-min-max-demo.component.scss']
})
export class ResizeMinMaxDemoComponent implements OnInit {
  demo_html = require('!!html-loader!./resize-min-max-demo.component.html');
  demo_ts = require('!!raw-loader!./resize-min-max-demo.component.ts');

  constructor() { }

  ngOnInit() {
  }

}
