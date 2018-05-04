export const CODE_HTML = `\
<div class="grid-container" #myBounds>
  <!-- Draggable block -->
  <div ngDraggable [bounds]="myBounds" [inBounds]="true" [gridSize]="gridSize" [zIndex]="100" [preventDefaultEvent]="true" class="drag-grid">
    <p>Drag</p>
  </div>
  <!-- Draw grids -->
  <div *ngFor="let x of grids">
    <div *ngFor="let y of grids">
      <div [ngDraggable]="false" [position]="{x: x, y: y }" [preventDefaultEvent]="true" class="grid">
        <small>grid</small>
      </div>
    </div>
  </div>
</div>`;

export const CODE_TS = `\
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snap-grid-demo',
  templateUrl: './snap-grid-demo.component.html',
  styleUrls: ['./snap-grid-demo.component.scss']
})
export class SnapGridDemoComponent implements OnInit {
  gridSize = 50;

  grids = [0, 50, 100, 150, 200];

  constructor() { }

  ngOnInit() {
  }

}`;
