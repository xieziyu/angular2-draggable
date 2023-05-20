import { Component } from '@angular/core';
// IGNORE START
declare const require: any;
// IGNORE END

@Component({
  selector: 'app-draggable-swap',
  templateUrl: './draggable-swap.component.html',
  styleUrls: ['./draggable-swap.component.scss'],
})
export class DraggableSwapComponent {
  // IGNORE START
  html =
    require('!!html-loader?{"minimize": {"removeComments":false,"caseSensitive":true}}!./draggable-swap.component.html')
      .default;
  component = require('!!raw-loader!./draggable-swap.component.ts').default;
  scss = require('!!raw-loader!./draggable-swap.component.scss').default;
  // IGNORE END
  positionA = { x: 0, y: 0 };
  positionB = { x: 160, y: 0 };

  onMoving(event) {
    const boxWidth = 150;
    const boxHeight = 60;

    if (
      this.positionA.x < this.positionB.x &&
      event.x + boxWidth >= this.positionB.x + boxWidth / 2 &&
      event.x <= this.positionB.x + boxWidth &&
      event.y + boxHeight >= this.positionA.y &&
      event.y <= this.positionA.y + boxHeight
    ) {
      let tmp = this.positionB;
      this.positionB = this.positionA;
      this.positionA = tmp;
    } else if (
      this.positionA.x >= this.positionB.x &&
      event.x <= this.positionB.x + boxWidth / 2 &&
      event.x + boxWidth >= this.positionB.x &&
      event.y + boxHeight >= this.positionA.y &&
      event.y <= this.positionA.y + boxHeight
    ) {
      let tmp = this.positionB;
      this.positionB = this.positionA;
      this.positionA = tmp;
    }
  }
}
