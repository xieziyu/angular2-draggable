import { Component } from '@angular/core';
import { AngularResizableDirective } from 'angular2-draggable';

// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-resizable-events',
  templateUrl: './resizable-events.component.html',
  styleUrls: ['./resizable-events.component.scss'],
})
export class ResizableEventsComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./resizable-events.component.html')
      .default;
  component = require('!!raw-loader!./resizable-events.component.ts').default;
  // IGNORE END
  state = '';
  size: any = null;
  position: any = null;
  aspectRatio = false;

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
