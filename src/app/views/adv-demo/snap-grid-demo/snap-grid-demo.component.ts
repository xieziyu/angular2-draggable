import { Component, OnInit } from '@angular/core';
import { CODE_HTML, CODE_TS } from './code';

@Component({
  selector: 'app-snap-grid-demo',
  templateUrl: './snap-grid-demo.component.html',
  styleUrls: ['./snap-grid-demo.component.scss']
})
export class SnapGridDemoComponent implements OnInit {
  demo_html = CODE_HTML;
  demo_ts = CODE_TS;

  gridSize = 50;

  grids = [0, 50, 100, 150, 200];

  constructor() { }

  ngOnInit() {
  }

}
