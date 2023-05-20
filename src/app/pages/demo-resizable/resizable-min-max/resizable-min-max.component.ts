import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-resizable-min-max',
  templateUrl: './resizable-min-max.component.html',
  styleUrls: ['./resizable-min-max.component.scss'],
})
export class ResizableMinMaxComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./resizable-min-max.component.html')
      .default;
  component = require('!!raw-loader!./resizable-min-max.component.ts').default;
  // IGNORE END
}
