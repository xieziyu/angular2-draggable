import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DemoResizableRoutingModule } from './demo-resizable-routing.module';
import { ResizableLayoutComponent } from './resizable-layout/resizable-layout.component';
import { ResizableBasicComponent } from './resizable-basic/resizable-basic.component';
import { ResizableEventsComponent } from './resizable-events/resizable-events.component';

@NgModule({
  declarations: [ResizableLayoutComponent, ResizableBasicComponent, ResizableEventsComponent],
  imports: [CommonModule, SharedModule, DemoResizableRoutingModule],
})
export class DemoResizableModule {}
