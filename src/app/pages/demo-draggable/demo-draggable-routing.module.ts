import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraggableLayoutComponent } from './draggable-layout/draggable-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: DraggableLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoDraggableRoutingModule {}
