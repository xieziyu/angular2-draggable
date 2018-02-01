import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  demo_html = `\
<div class="row">
  <div class="col-sm-6">
    <p><button (click)="draggable = !draggable" class="btn btn-outline-primary">toggle [ngDraggable]</button></p>
    <p><button (click)="useHandle = !useHandle" class="btn btn-outline-primary">toggle handle</button></p>
    <p><button (click)="zIndex = '1000'" class="btn btn-outline-primary">set [zIndex] to 1000</button></p>
    <p><button (click)="zIndexMoving = '99999'" class="btn btn-outline-primary">set [zIndexMoving] to 99999</button></p>
    <p><button (click)="preventDefaultEvent = !preventDefaultEvent" class="btn btn-outline-primary">toggle [preventDefaultEvent]</button></p>
  </div>
  <div class="col-sm-6">
    <div *ngIf="useHandle">
    <div
      [ngDraggable]="draggable"
      [zIndex]="zIndex"
      [zIndexMoving]="zIndexMoving"
      [handle]="myHandle"
      [preventDefaultEvent]="preventDefaultEvent"
      class="drag-block-lg">
        <div #myHandle class="drag-block-handle"> #myHandle </div>
        <p>[handle]="myHandle"</p>
        <p>[ngDraggable] = {{ draggable }}</p>
        <p>[zIndex] = {{ zIndex === undefined ? 'undefined' : zIndex }}</p>
        <p>[zIndexMoving] = {{ zIndexMoving === undefined ? 'undefined' : zIndexMoving }}</p>
      </div>
    </div>
    <div *ngIf="!useHandle">
      <div [ngDraggable]="draggable" [zIndex]="zIndex" [zIndexMoving]="zIndexMoving" class="drag-block-lg">
        <p>[ngDraggable] = {{ draggable }}</p>
        <p>[zIndex] = {{ zIndex === undefined ? 'undefined' : zIndex }}</p>
        <p>[zIndexMoving] = {{ zIndexMoving === undefined ? 'undefined' : zIndexMoving }}</p>
      </div>
    </div>
  </div>
</div>`;
  demo_ts = `\
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
  preventDefaultEvent = true;

  constructor() { }

  ngOnInit() { }
}`;

  draggable = true;
  useHandle = false;
  zIndex;
  zIndexMoving;
  preventDefaultEvent = true;

  constructor() { }

  ngOnInit() { }
}
