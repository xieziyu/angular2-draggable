import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwapDemoComponent } from './swap-demo/swap-demo.component';

const routes: Routes = [
  {
    path: 'swap',
    component: SwapDemoComponent,
    data: {
      title: 'Swap'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvDemoRoutingModule { }
