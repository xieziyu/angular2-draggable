import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-draggable-options',
  templateUrl: './draggable-options.component.html',
  styleUrls: ['./draggable-options.component.scss'],
})
export class DraggableOptionsComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./draggable-options.component.html')
      .default;
  component = require('!!raw-loader!./draggable-options.component.ts').default;
  // IGNORE END
  draggable = true;
  useHandle = false;
  zIndex;
  zIndexMoving;
  preventDefaultEvent = false;
  trackPosition = true;
  position;
  lockAxis;
}
