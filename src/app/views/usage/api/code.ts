export const CODE_HTML = `\
<div class="row">
  <div class="col-sm-6">
    <p><button (click)="block.resetPosition()" class="btn btn-outline-primary">Reset Position</button></p>
  </div>
  <div class="col-sm-6">
    <div ngDraggable #block="ngDraggable" class="drag-block-lg">
    </div>
  </div>
</div>`;

export const CODE_TS = `\
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}`;
