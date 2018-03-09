export const CODE_HTML = `\
<div class="row">
  <div class="col-sm-6">
    <p><button (click)="draggable = !draggable" class="btn btn-outline-primary">toggle [ngDraggable]</button></p>
    <p><button (click)="position = position ? undefined : {x: 50, y: 50}" class="btn btn-outline-primary">set [position]</button></p>
    <p><button (click)="useHandle = !useHandle" class="btn btn-outline-primary">toggle [handle]</button></p>
    <p><button (click)="zIndex = '1000'" class="btn btn-outline-primary">set [zIndex] to 1000</button></p>
    <p><button (click)="zIndexMoving = '99999'" class="btn btn-outline-primary">set [zIndexMoving] to 99999</button></p>
    <p><button (click)="preventDefaultEvent = !preventDefaultEvent" class="btn btn-outline-primary">toggle [preventDefaultEvent]</button></p>
    <p><button (click)="trackPosition = !trackPosition" class="btn btn-outline-primary">toggle [trackPosition]</button></p>
  </div>
  <div class="col-sm-6">
    <div *ngIf="useHandle">
      <div
        [ngDraggable]="draggable"
        [position]="position"
        [zIndex]="zIndex"
        [zIndexMoving]="zIndexMoving"
        [handle]="myHandle"
        [preventDefaultEvent]="preventDefaultEvent"
        [trackPosition]="trackPosition"
        class="drag-block-lg">
        <div #myHandle class="drag-block-handle"> #myHandle </div>
        <p>[handle]="myHandle"</p>
        <p>[ngDraggable] = {{ draggable }}</p>
        <p>[position] = {{ position === undefined ? 'undefined' : position | json }}</p>
        <p>[zIndex] = {{ zIndex === undefined ? 'undefined' : zIndex }}</p>
        <p>[zIndexMoving] = {{ zIndexMoving === undefined ? 'undefined' : zIndexMoving }}</p>
        <p>[preventDefaultEvent] = {{ preventDefaultEvent }}</p>
        <p>[trackPosition] = {{ trackPosition }}</p>
      </div>
    </div>
    <div *ngIf="!useHandle">
      <div
        [ngDraggable]="draggable"
        [position]="position"
        [zIndex]="zIndex"
        [zIndexMoving]="zIndexMoving"
        [preventDefaultEvent]="preventDefaultEvent"
        [trackPosition]="trackPosition"
        class="drag-block-lg">
        <p>[ngDraggable] = {{ draggable }}</p>
        <p>[position] = {{ position === undefined ? 'undefined' : position | json }}</p>
        <p>[zIndex] = {{ zIndex === undefined ? 'undefined' : zIndex }}</p>
        <p>[zIndexMoving] = {{ zIndexMoving === undefined ? 'undefined' : zIndexMoving }}</p>
        <p>[preventDefaultEvent] = {{ preventDefaultEvent }}</p>
        <p>[trackPosition] = {{ trackPosition }}</p>
      </div>
    </div>
  </div>
</div>`;

export const CODE_TS = `\
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  draggable = true;
  useHandle = false;
  zIndex;
  zIndexMoving;
  preventDefaultEvent = false;
  trackPosition = true;
  position;

  constructor() { }

  ngOnInit() { }
}`;
