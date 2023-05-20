import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DemoResizableRoutingModule } from './demo-resizable-routing.module';
import { ResizableLayoutComponent } from './resizable-layout/resizable-layout.component';
import { ResizableBasicComponent } from './resizable-basic/resizable-basic.component';
import { ResizableEventsComponent } from './resizable-events/resizable-events.component';
import { ResizableContainmentComponent } from './resizable-containment/resizable-containment.component';
import { ResizableGridComponent } from './resizable-grid/resizable-grid.component';
import { ResizableMinMaxComponent } from './resizable-min-max/resizable-min-max.component';
import { ResizableIframeComponent } from './resizable-iframe/resizable-iframe.component';

@NgModule({
  declarations: [ResizableLayoutComponent, ResizableBasicComponent, ResizableEventsComponent, ResizableContainmentComponent, ResizableGridComponent, ResizableMinMaxComponent, ResizableIframeComponent],
  imports: [CommonModule, SharedModule, DemoResizableRoutingModule],
})
export class DemoResizableModule {}
