import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { OptionsComponent } from './options/options.component';
import { EventsComponent } from './events/events.component';
import { BoundaryComponent } from './boundary/boundary.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [
  {
    path: 'basic',
    component: BasicComponent,
    data: {
      title: 'Basic'
    }
  },
  {
    path: 'options',
    component: OptionsComponent,
    data: {
      title: 'Options'
    }
  },
  {
    path: 'events',
    component: EventsComponent,
    data: {
      title: 'Events'
    }
  },
  {
    path: 'boundary',
    component: BoundaryComponent,
    data: {
      title: 'Boundary Check'
    }
  },
  {
    path: 'api',
    component: ApiComponent,
    data: {
      title: 'API'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsageRoutingModule { }
