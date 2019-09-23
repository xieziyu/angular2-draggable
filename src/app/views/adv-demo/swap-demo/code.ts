export const CODE_HTML = `\
<div class="box-container">
  <div class="box-swap bg-success" ngDraggable
    [preventDefaultEvent]="true"
    [zIndexMoving]="9999"
    [trackPosition]="false"
    [position]="positionA"
    (movingOffset)="onMoving($event)">A (Drag)</div>
  <div class="box-swap bg-info static-block" [ngDraggable]="false" [preventDefaultEvent]="true" [position]="positionB">B</div>
</div>`;

export const CODE_TS = `\
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-swap-demo',
  templateUrl: './swap-demo.component.html',
  styleUrls: ['./swap-demo.component.scss']
})
export class SwapDemoComponent implements OnInit {
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
}`;

export const CODE_SCSS = `\
.box-container {
  position: relative;
  height: 150px;
  padding: 45px 0;
}

.box-swap {
  position: absolute;
  text-align: center;
  width: 150px;
  height: 60px;
  padding: 15px 35px;
  line-height: 30px;

  &.static-block {
    transition: all 0.3s ease-out;
  }
}`;
