import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AdvDemoRoutingModule } from './adv-demo-routing.module';
import { SwapDemoComponent } from './swap-demo/swap-demo.component';

@NgModule({
  imports: [
    CommonModule,
    AdvDemoRoutingModule,
    SharedModule
  ],
  declarations: [
    SwapDemoComponent
  ]
})
export class AdvDemoModule { }
