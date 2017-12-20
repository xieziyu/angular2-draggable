import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';

const routes: Routes = [
  {
    path: 'basic',
    component: BasicComponent,
    data: {
      title: 'Basic'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsageRoutingModule { }
