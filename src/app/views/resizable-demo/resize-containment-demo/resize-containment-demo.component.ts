import { Component, OnInit } from '@angular/core';

declare const require: any;

@Component({
  selector: 'app-resize-containment-demo',
  templateUrl: './resize-containment-demo.component.html',
  styleUrls: ['./resize-containment-demo.component.scss']
})
export class ResizeContainmentDemoComponent implements OnInit {
  demo_html = require('!!html-loader!./resize-containment-demo.component.html');
  demo_ts = require('!!raw-loader!./resize-containment-demo.component.ts');

  constructor() { }

  ngOnInit() {
  }

}
