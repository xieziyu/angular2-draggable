import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResizableLayoutComponent } from './resizable-layout/resizable-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: ResizableLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoResizableRoutingModule {}
