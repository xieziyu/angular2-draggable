import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ResizableDemoRoutingModule } from './resizable-demo-routing.module';
import { ResizeDefaultDemoComponent } from './resize-default-demo/resize-default-demo.component';
import { ResizeEventDemoComponent } from './resize-event-demo/resize-event-demo.component';
import { ResizeAspectRatioDemoComponent } from './resize-aspect-ratio-demo/resize-aspect-ratio-demo.component';
import { ResizeContainmentDemoComponent } from './resize-containment-demo/resize-containment-demo.component';
import { ResizeGridDemoComponent } from './resize-grid-demo/resize-grid-demo.component';
import { ResizeMinMaxDemoComponent } from './resize-min-max-demo/resize-min-max-demo.component';

@NgModule({
  imports: [
    CommonModule,
    ResizableDemoRoutingModule,
    SharedModule
  ],
  declarations: [
    ResizeDefaultDemoComponent,
    ResizeEventDemoComponent,
    ResizeAspectRatioDemoComponent,
    ResizeContainmentDemoComponent,
    ResizeGridDemoComponent,
    ResizeMinMaxDemoComponent
  ]
})
export class ResizableDemoModule { }
