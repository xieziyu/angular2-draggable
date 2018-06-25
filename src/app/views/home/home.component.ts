import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  demo_html = `\
<!-- Basic Usage -->
<div ngDraggable> Drag Me! </div>

<!-- Disable -->
<div [ngDraggable]="false"> Disabled </div>
`;

  demo_rz_html = `\
<!-- Basic Usage -->
<div ngResizable> I'm resizable </div>

<!-- Disable -->
<div [ngResizable]="false"> Disabled </div>
`;

  constructor() { }

  ngOnInit() {
  }

}
