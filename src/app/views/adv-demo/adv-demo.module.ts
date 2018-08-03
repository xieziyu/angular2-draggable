import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AdvDemoRoutingModule } from './adv-demo-routing.module';
import { SwapDemoComponent } from './swap-demo/swap-demo.component';
import { SnapGridDemoComponent } from './snap-grid-demo/snap-grid-demo.component';
import { IframeDemoComponent } from './iframe-demo/iframe-demo.component';

@NgModule({
  imports: [
    CommonModule,
    AdvDemoRoutingModule,
    SharedModule
  ],
  declarations: [
    SwapDemoComponent,
    SnapGridDemoComponent,
    IframeDemoComponent
  ]
})
export class AdvDemoModule { }
