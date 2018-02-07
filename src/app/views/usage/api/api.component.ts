import { Component, OnInit } from '@angular/core';
import { CODE_HTML, CODE_TS } from './code';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  demo_html = CODE_HTML;
  demo_ts = CODE_TS;

  constructor() { }

  ngOnInit() {
  }

}
