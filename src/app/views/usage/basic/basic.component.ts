import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  demo_html = `<div class="drag-block" ngDraggable>Drag Me</div>`;

  constructor() { }

  ngOnInit() { }

}
