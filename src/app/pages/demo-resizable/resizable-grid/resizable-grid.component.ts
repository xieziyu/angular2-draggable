import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-resizable-grid',
  templateUrl: './resizable-grid.component.html',
  styleUrls: ['./resizable-grid.component.scss'],
})
export class ResizableGridComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./resizable-grid.component.html')
      .default;
  component = require('!!raw-loader!./resizable-grid.component.ts').default;
  // IGNORE END
}
