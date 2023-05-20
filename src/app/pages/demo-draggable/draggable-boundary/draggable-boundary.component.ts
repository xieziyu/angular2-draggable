import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-draggable-boundary',
  templateUrl: './draggable-boundary.component.html',
  styleUrls: ['./draggable-boundary.component.scss'],
})
export class DraggableBoundaryComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./draggable-boundary.component.html')
      .default;
  component = require('!!raw-loader!./draggable-boundary.component.ts').default;
  // IGNORE END
  inBounds = true;
  myOutOfBounds = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  };
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true,
  };

  checkEdge(event) {
    this.edge = event;
    console.log('edge:', event);
  }

  outOfBounds(position) {
    if (this.myOutOfBounds[position]) {
      this.myOutOfBounds[position] = false;
    } else {
      this.myOutOfBounds[position] = true;
    }
  }
}
