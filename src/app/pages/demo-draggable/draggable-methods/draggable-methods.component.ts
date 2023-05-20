import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-draggable-methods',
  templateUrl: './draggable-methods.component.html',
  styleUrls: ['./draggable-methods.component.scss'],
})
export class DraggableMethodsComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./draggable-methods.component.html')
      .default;
  component = require('!!raw-loader!./draggable-methods.component.ts').default;
  // IGNORE END
}
