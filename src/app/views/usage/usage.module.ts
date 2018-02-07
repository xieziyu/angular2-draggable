import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsageRoutingModule } from './usage-routing.module';
import { BasicComponent } from './basic/basic.component';
import { OptionsComponent } from './options/options.component';
import { EventsComponent } from './events/events.component';
import { BoundaryComponent } from './boundary/boundary.component';
import { ApiComponent } from './api/api.component';

@NgModule({
  imports: [
    CommonModule,
    UsageRoutingModule,
    SharedModule
  ],
  declarations: [
    BasicComponent,
    OptionsComponent,
    EventsComponent,
    BoundaryComponent,
    ApiComponent
  ]
})
export class UsageModule { }
