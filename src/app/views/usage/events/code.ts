export const CODE_HTML = `\
<div class="row">
  <div class="col-sm-4">
    <div class="alert alert-secondary" role="alert">
      movingOffset: {{'{'}} x: {{movingOffset.x}}, y: {{movingOffset.y}} {{'}'}}
    </div>
    <div class="alert alert-secondary" role="alert">
      endOffset: {{'{'}} x: {{endOffset.x}}, y: {{endOffset.y}} {{'}'}}
    </div>
  </div>
  <div class="col-sm-8">
    <div ngDraggable class="drag-block" (started)="onStart($event)" (stopped)="onStop($event)" (movingOffset)="onMoving($event)"
      [preventDefaultEvent]="true" (endOffset)="onMoveEnd($event)">
      <p>Drag me</p>
      <p>check your console</p>
    </div>
  </div>
</div>`;

export const CODE_TS = `\
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  movingOffset = { x: 0, y: 0 };
  endOffset = { x: 0, y: 0 };

  constructor() { }

  ngOnInit() {
  }

  onStart(event) {
    console.log('started output:', event);
  }

  onStop(event) {
    console.log('stopped output:', event);
  }

  onMoving(event) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
  }

  onMoveEnd(event) {
    this.endOffset.x = event.x;
    this.endOffset.y = event.y;
  }
}`;
