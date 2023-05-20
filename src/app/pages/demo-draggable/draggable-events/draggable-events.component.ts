import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-draggable-events',
  templateUrl: './draggable-events.component.html',
  styleUrls: ['./draggable-events.component.scss'],
})
export class DraggableEventsComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./draggable-events.component.html')
      .default;
  component = require('!!raw-loader!./draggable-events.component.ts').default;
  // IGNORE END
  movingOffset = { x: 0, y: 0 };
  endOffset = { x: 0, y: 0 };

  onStart(event) {
    console.log('started output:', event);
  }

  onStop(event) {
    console.log('stopped output:', event);
  }

  onMoving(event) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
  }

  onMoveEnd(event) {
    this.endOffset.x = event.x;
    this.endOffset.y = event.y;
  }
}
