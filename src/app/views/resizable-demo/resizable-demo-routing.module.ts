import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResizeDefaultDemoComponent } from './resize-default-demo/resize-default-demo.component';
import { ResizeEventDemoComponent } from './resize-event-demo/resize-event-demo.component';
import { ResizeAspectRatioDemoComponent } from './resize-aspect-ratio-demo/resize-aspect-ratio-demo.component';
import { ResizeContainmentDemoComponent } from './resize-containment-demo/resize-containment-demo.component';
import { ResizeGridDemoComponent } from './resize-grid-demo/resize-grid-demo.component';
import { ResizeMinMaxDemoComponent } from './resize-min-max-demo/resize-min-max-demo.component';

const routes: Routes = [
  {
    path: 'default',
    component: ResizeDefaultDemoComponent,
    data: {
      title: 'Default Functionality'
    }
  },
  {
    path: 'events',
    component: ResizeEventDemoComponent,
    data: {
      title: 'Events'
    }
  },
  {
    path: 'aspect-ratio',
    component: ResizeAspectRatioDemoComponent,
    data: {
      title: 'Aspect Ratio'
    }
  },
  {
    path: 'containment',
    component: ResizeContainmentDemoComponent,
    data: {
      title: 'Containment'
    }
  },
  {
    path: 'grid',
    component: ResizeGridDemoComponent,
    data: {
      title: 'Snap to grid'
    }
  },
  {
    path: 'min-max',
    component: ResizeMinMaxDemoComponent,
    data: {
      title: 'Minimum & maximum size'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResizableDemoRoutingModule { }
