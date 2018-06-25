import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwapDemoComponent } from './swap-demo/swap-demo.component';
import { SnapGridDemoComponent } from './snap-grid-demo/snap-grid-demo.component';


const routes: Routes = [
  {
    path: 'swap',
    component: SwapDemoComponent,
    data: {
      title: 'Swap'
    }
  },
  {
    path: 'snap-grid',
    component: SnapGridDemoComponent,
    data: {
      title: 'Snap to Grid'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvDemoRoutingModule { }
