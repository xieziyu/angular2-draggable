import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResizeDefaultDemoComponent } from './resize-default-demo/resize-default-demo.component';


const routes: Routes = [
  {
    path: 'default',
    component: ResizeDefaultDemoComponent,
    data: {
      title: 'Default Functionality'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResizableDemoRoutingModule { }
