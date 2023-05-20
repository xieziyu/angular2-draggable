import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-draggable-basic',
  templateUrl: './draggable-basic.component.html',
  styleUrls: ['./draggable-basic.component.scss'],
})
export class DraggableBasicComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./draggable-basic.component.html')
      .default;
  component = require('!!raw-loader!./draggable-basic.component.ts').default;
  // IGNORE END
}
