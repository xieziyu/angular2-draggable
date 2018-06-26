import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ResizableDemoRoutingModule } from './resizable-demo-routing.module';
import { ResizeDefaultDemoComponent } from './resize-default-demo/resize-default-demo.component';
import { ResizeEventDemoComponent } from './resize-event-demo/resize-event-demo.component';

@NgModule({
  imports: [
    CommonModule,
    ResizableDemoRoutingModule,
    SharedModule
  ],
  declarations: [
    ResizeDefaultDemoComponent,
    ResizeEventDemoComponent
  ]
})
export class ResizableDemoModule { }
