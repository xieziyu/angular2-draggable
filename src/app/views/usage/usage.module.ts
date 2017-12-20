import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsageRoutingModule } from './usage-routing.module';
import { BasicComponent } from './basic/basic.component';

@NgModule({
  imports: [
    CommonModule,
    UsageRoutingModule,
    SharedModule
  ],
  declarations: [
    BasicComponent
  ]
})
export class UsageModule { }
