import { Component, OnInit } from '@angular/core';

declare const require: any;

@Component({
  selector: 'app-resize-aspect-ratio-demo',
  templateUrl: './resize-aspect-ratio-demo.component.html',
  styleUrls: ['./resize-aspect-ratio-demo.component.scss']
})
export class ResizeAspectRatioDemoComponent implements OnInit {
  demo_html = require('!!html-loader!./resize-aspect-ratio-demo.component.html');
  demo_ts = require('!!raw-loader!./resize-aspect-ratio-demo.component.ts');

  aspectRatio = true;

  constructor() { }

  ngOnInit() {
  }

}
