import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DemoDraggableRoutingModule } from './demo-draggable-routing.module';
import { DraggableBasicComponent } from './draggable-basic/draggable-basic.component';
import { DraggableLayoutComponent } from './draggable-layout/draggable-layout.component';
import { DraggableOptionsComponent } from './draggable-options/draggable-options.component';
import { DraggableEventsComponent } from './draggable-events/draggable-events.component';
import { DraggableBoundaryComponent } from './draggable-boundary/draggable-boundary.component';
import { DraggableMethodsComponent } from './draggable-methods/draggable-methods.component';

@NgModule({
  declarations: [DraggableBasicComponent, DraggableLayoutComponent, DraggableOptionsComponent, DraggableEventsComponent, DraggableBoundaryComponent, DraggableMethodsComponent],
  imports: [CommonModule, SharedModule, DemoDraggableRoutingModule],
})
export class DemoDraggableModule {}
