import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-resizable-basic',
  templateUrl: './resizable-basic.component.html',
  styleUrls: ['./resizable-basic.component.scss'],
})
export class ResizableBasicComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./resizable-basic.component.html')
      .default;
  component = require('!!raw-loader!./resizable-basic.component.ts').default;
  // IGNORE END
}
