import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-resizable-iframe',
  templateUrl: './resizable-iframe.component.html',
  styleUrls: ['./resizable-iframe.component.scss'],
})
export class ResizableIframeComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./resizable-iframe.component.html')
      .default;
  component = require('!!raw-loader!./resizable-iframe.component.ts').default;
  scss = require('!!raw-loader!./resizable-iframe.component.scss').default;
  // IGNORE END
}
