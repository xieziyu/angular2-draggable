import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boundary',
  templateUrl: './boundary.component.html',
  styleUrls: ['./boundary.component.scss']
})
export class BoundaryComponent implements OnInit {
  demo_html = `
<div class="row">
  <div class="col-sm-4">
    <p><button (click)="inBounds = !inBounds" class="btn btn-outline-primary">toggle [inBounds]</button></p>
  </div>
  <div class="col-sm-8">
    <div class="drag-boundary" [ngClass]="{ 'top-b': !edge?.top, 'bottom-b': !edge?.bottom, 'left-b': !edge?.left, 'right-b': !edge?.right }" #myBounds>
      <p class="label">#myBounds</p>
      <div ngDraggable class="drag-block" (edge)="checkEdge($event)" [bounds]="myBounds" [inBounds]="inBounds">
        <p>Drag me {{ inBounds?'in #myBounds':'' }}</p>
        <p>check your console</p>
      </div>
    </div>
  </div>
</div>
`;
  demo_ts = `\
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boundary',
  templateUrl: './boundary.component.html',
  styleUrls: ['./boundary.component.scss']
})
export class BoundaryComponent implements OnInit {
  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };

  constructor() { }

  ngOnInit() {
  }

  checkEdge(event) {
    this.edge = event;
    console.log('edge:', event);
  }
}`;
  inBounds = true;
  myOutOfBounds = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };

  constructor() { }

  ngOnInit() {
  }

  checkEdge(event) {
    this.edge = event;
    console.log('edge:', event);
  }

  outOfBounds(position) {
    if (this.myOutOfBounds[position]) {
      this.myOutOfBounds[position] = false;
    } else {
      this.myOutOfBounds[position] = true;
    }
  }
}
