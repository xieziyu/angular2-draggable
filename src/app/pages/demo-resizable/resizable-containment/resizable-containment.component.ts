import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-resizable-containment',
  templateUrl: './resizable-containment.component.html',
  styleUrls: ['./resizable-containment.component.scss'],
})
export class ResizableContainmentComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./resizable-containment.component.html')
      .default;
  component = require('!!raw-loader!./resizable-containment.component.ts').default;
  // IGNORE END
}
