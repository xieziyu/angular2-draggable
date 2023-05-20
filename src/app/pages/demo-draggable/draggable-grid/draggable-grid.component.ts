import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-draggable-grid',
  templateUrl: './draggable-grid.component.html',
  styleUrls: ['./draggable-grid.component.scss'],
})
export class DraggableGridComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./draggable-grid.component.html')
      .default;
  component = require('!!raw-loader!./draggable-grid.component.ts').default;
  // IGNORE END
  gridSize = 50;
  grids = [0, 50, 100, 150, 200];
}
