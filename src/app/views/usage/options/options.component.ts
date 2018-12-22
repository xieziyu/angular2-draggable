import { Component, OnInit } from '@angular/core';
import { CODE_HTML, CODE_TS } from './code';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  demo_html = CODE_HTML;
  demo_ts = CODE_TS;

  draggable = true;
  useHandle = false;
  zIndex;
  zIndexMoving;
  preventDefaultEvent = false;
  trackPosition = true;
  position;
  lockAxis;

  constructor() { }

  ngOnInit() { }
}
