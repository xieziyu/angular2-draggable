import { Component, OnInit } from '@angular/core';
import { AngularResizableDirective } from 'angular2-draggable';

declare const require: any;

@Component({
  selector: 'app-resize-event-demo',
  templateUrl: './resize-event-demo.component.html',
  styleUrls: ['./resize-event-demo.component.scss']
})
export class ResizeEventDemoComponent implements OnInit {
  demo_html = require('!!html-loader!./resize-event-demo.component.html');
  demo_ts = require('!!raw-loader!./resize-event-demo.component.ts');

  state = '';
  size: any = null;
  position: any = null;

  constructor() { }

  ngOnInit() {
  }

  onResizeStart(event) {
    this.state = 'Resize Started';
    this.size = event.size;
    this.position = event.position;
  }

  onResizing(event) {
    this.state = 'Resizing';
    this.size = event.size;
    this.position = event.position;
  }

  onResizeStop(event) {
    this.state = 'Resize Stopped';
    this.size = event.size;
    this.position = event.position;
  }

  onReset(block: AngularResizableDirective) {
    block.resetSize();
    let { size, position } = block.getStatus();
    this.size = size;
    this.position = position;
  }

}
