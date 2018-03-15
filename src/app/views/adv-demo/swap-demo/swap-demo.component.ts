import { Component, OnInit } from '@angular/core';
import { CODE_HTML, CODE_SCSS, CODE_TS } from './code';

@Component({
  selector: 'app-swap-demo',
  templateUrl: './swap-demo.component.html',
  styleUrls: ['./swap-demo.component.scss']
})
export class SwapDemoComponent implements OnInit {
  demo_html = CODE_HTML;
  demo_ts = CODE_TS;
  demo_scss = CODE_SCSS;

  positionA = { x: 0, y: 0 };
  positionB = { x: 160, y: 0 };

  constructor() { }

  ngOnInit() {
  }

  onMoving(event) {
    const boxWidth = 150;
    const boxHeight = 60;

    if (this.positionA.x < this.positionB.x &&
      event.x + boxWidth >= this.positionB.x + boxWidth / 2 &&
      event.x <= this.positionB.x + boxWidth &&
      event.y + boxHeight >= this.positionA.y &&
      event.y <= this.positionA.y + boxHeight) {
        let tmp = this.positionB;
        this.positionB = this.positionA;
        this.positionA = tmp;
    } else if (this.positionA.x >= this.positionB.x &&
      event.x <= this.positionB.x + boxWidth / 2 &&
      event.x + boxWidth >= this.positionB.x &&
      event.y + boxHeight >= this.positionA.y &&
      event.y <= this.positionA.y + boxHeight) {
        let tmp = this.positionB;
        this.positionB = this.positionA;
        this.positionA = tmp;
    }
  }
}
